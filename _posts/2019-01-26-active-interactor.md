---
title: ActiveInteractor
author: Aaron Allen <hello@aaronmallen.me>
tweet: 'An implementation of the Command Pattern for Ruby with ActiveModel::Validations based on the interactors gem. Rich support for attributes, callbacks, and validations, and thread safe performance methods.'
layout: default
---

This weekend I released v1.0.0 of [ActiveInteractor], an implementation of the [command pattern] for Ruby with [ActiveModel::Validations] based on the [interactor] gem with rich support for attributes, callbacks, and validations, and thread safe performance methods.

I wanted to go over some of the basic usage of the gem. An interactor is a simple, single-purpose service object. Interactors can be used to reduce the responsibility of your controllers, workers, and models and encapsulate your application's [business logic]. Each interactor represents one thing that your application does.

ActiveInteractor's main component is called an interactor, each interactor has it's own immutable context which contains everything the interactor needs to do its work. When an interactor does its single purpose, it affects its given context. There are two kinds of interactors built into ActiveInteractor: basic interactors and organizers. A basic interactor is a class that inherits from `ActiveInteractor::Base` and defines a `#perform` method.

## Basic Usage

Most of the time, your application will use its interactors from its controllers. The following controller:

```ruby
class SessionsController < ApplicationController
  def create
    if user = User.authenticate(session_params[:email], session_params[:password])
      session[:user_token] = user.secret_token
      redirect_to user
    else
      flash.now[:message] = "Please try again."
      render :new
    end
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
```

can be refactored to:

```ruby
# app/interactors/authenticate_user_context.rb
class AuthenticateUserContext < ActiveInteractor::Context::Base
  attributes :email, :password, :user, :token
  validates :email, presence: true,
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true
  validates :user, presence: true, on: :called
end

# app/interactors/authenticate_user.rb
class AuthenticateUser < ActiveInteractor::Base
  def perform
    context.user = User.authenticate(
      context.email,
      context.password
    )
    context.token = context.user.secret_token
  end
end

# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController
  def create
    result = AuthenticateUser.perform(session_params)

    if result.success?
      session[:user_token] = result.token
      redirect_to result.user
    else
      flash.now[:message] = t(result.errors.full_messages)
      render :new
    end
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
```

## Organizers

An organizer is an important variation on the basic interactor. Its single purpose is to run other interactors.

```ruby
class CreateOrder < ActiveInteractor::Base
  def perform
    ...
  end
end

class ChargeCard < ActiveInteractor::Base
  def perform
    ...
  end
end

class SendThankYou < ActiveInteractor::Base
  def perform
    ...
  end
end

class PlaceOrder < ActiveInteractor::Organizer::Base

  organize :create_order, :charge_card, :send_thank_you
end
```

In a controller, you can run the `PlaceOrder` organizer just like you would any other interactor:

```ruby
class OrdersController < ApplicationController
  def create
    result = PlaceOrder.perform(order_params: order_params)

    if result.success?
      redirect_to result.order
    else
      @order = result.order
      render :new
    end
  end

  private

  def order_params
    params.require(:order).permit!
  end
end
```

The organizer passes its context to the interactors that it organizes, one at a time and in order. Each interactor may change that context before it's passed along to the next interactor.

### Organizing Interactors Conditionally

We can also add conditional statements to our organizer by passing a block to the `.organize` method:

```ruby
class PlaceOrder < ActiveInteractor::Organizer::Base
  organize do
    add :create_order, if :user_registered?
    add :charge_card, if: -> { context.order }
    add :send_thank_you, if: -> { context.order }
  end

  private

  def user_registered?
    context.user&.registered?
  end
end
```

## Working With Rails

If you're working with a rails project ActiveInteractor comes bundled with some useful generators to help speed up development. You should first run the install generator with:

```
rails generate active_interactor:install
```

In some instances you may want to use an `ActiveRecord` model as a context for an interactor. You can do this by calling the `.acts_as_context` method on any `ActiveRecord` model, and then simply call the `.contextualize_with` method on your interactor or organizer to point it to the appropriate class.

```ruby
# app/models/user.rb
class User < ApplicationRecord
  acts_as_context
end

# app/interactors/create_user.rb
class CreateUser < ApplicationInteractor
  contextualize_with :user

  def perform
    context.email&.downcase!
    context.save
  end
end

CreateUser.perform(email: 'HELLO@AARONMALLEN.ME')
#=> <#User id=1 email='hello@aaronmallen.me'>
```

I hope the ruby community finds this gem usefull and I'd love any feed back, issues, or stars on the [repository] that you're willing to give. Detailed usage for the gem can be found on the [wiki]. Technical documentation for the gem can be found on [rubydoc].

[ActiveModel::Validations]: https://api.rubyonrails.org/classes/ActiveModel/Validations.html
[ActiveInteractor]: https://rubygems.org/gems/activeinteractor/
[business logic]: https://en.wikipedia.org/wiki/Business_logic
[command pattern]: https://en.wikipedia.org/wiki/Command_pattern
[interactor]: https://github.com/collectiveidea/interactor
[repository]: https://github.com/aaronmallen/activeinteractor
[rubydoc]: https://www.rubydoc.info/gems/activeinteractor
[wiki]: https://github.com/aaronmallen/activeinteractor/wiki

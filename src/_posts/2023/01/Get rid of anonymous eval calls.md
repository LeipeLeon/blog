---
layout: post
title:  "TIL: Get rid of anonymous eval calls"
date:   2023-01-23 10:24:12 CES
---

While reviewing the [changelog of Psych](https://github.com/ruby/psych/compare/bdf20e604204024eae580fbd5f697e171e55ac2d...a170b8eb466f25d16c4ceb1451a75de1d2c8c0cc) I stumbled upon a commit: [**"Get rid of anonymous eval calls"**](https://github.com/ruby/psych/commit/38871ad4e5e3b367256ac0a950b2ed7eb0335091)

Checking the diff I saw some hackery which spiked my interests:

```diff
- class_eval <<~RUBY
+ class_eval <<~RUBY, __FILE__, __LINE__ + 1
```

This raised my eyebrows a bit and after some investigation (e.g. searching [SO](https://stackoverflow.com/a/2496240/234171)) I found this explanation:

> The string is evaled to create the function. The `class_eval`/`instance_eval` function uses the `__FILE__` and `__LINE__` to add debug information. (edited)

Which results in change of the following statement snippet

```diff
  $ ruby foo.rb
  Traceback (most recent call last):
    1: from foo.rb:9:in `<main>'
- (eval):4:in `foo': undefined method `abc' for 123:Integer (NoMethodError)
+ foo.rb:5:in `foo': undefined method `abc' for 123:Integer (NoMethodError)
```

## Refs

- H/T: <https://stackoverflow.com/a/2496240/234171>
- H/T: <https://github.com/ruby/psych/commit/38871ad4e5e3b367256ac0a950b2ed7eb0335091>

**Used code**

```ruby
# foo.rb
instance_eval <<-RUBY, __FILE__, __LINE__ + 1
  def foo
    a = 123
    b = :abc
    a.send b
  end
RUBY
foo
```

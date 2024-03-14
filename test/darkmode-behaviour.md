
# media
```
@media (prefers-color-scheme: dark) {
  :root {
    ...
  }
}
```

# class
```
:is(.dark .dark\:bg-purple-500) {
   ...
}
```

# selector
```
.dark\:bg-purple-500:where(.dark, .dark *) {
   ...
}
```

# ["class", "[data-theme='dark']"]
```
:is([data-theme='dark'] .dark\:bg-purple-500) {
   ...
}
```

# ['selector', '[data-theme="dark"]']
```
.dark\:bg-purple-500:where([data-theme="dark"], [data-theme="dark"] *) {
   ...
}
```

#  ['variant', '.theme &']
```
.theme .dark\:bg-purple-500 {
  ...
}
```
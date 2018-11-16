# Internationalization Please

This documentation based on CLDR data and tons of issue on github for tell UI/UX developers that i18n matters.

![Globe](https://media.giphy.com/media/9JgeSP0jlRAVBOG9FD/giphy.gif "Globe")

## Statistics

Base on world population and cldr data the result show why this is important to desing world class UI library need to be real implementation if i18n.

## Right to left (RTL)

One of the most problem for UI developer projects is not officially support RTL, and by some patch and tools just inject the dirty stuff to code.

These are one of the basics property since the web was born but no one care:

```html
<!doctype html>
<html dir="rtl">
```

```css
html {
    direction: rtl;
}
```

[See opened issue on git hub for RTL support please](https://github.com/search?q=rtl&type=Issues)

## Calendars

Base on CLDR data there are different calendar types in many countries that don't UI developer doesn't care about it.

As my experience most problem for UI libraries is RTL support and some stuff like date time picker or other stuff.

# Styledown

Write maintainable CSS styleguides efficiently using a Markdown.
**[See example ▸][example]**

[![Example](https://cdn.rawgit.com/styledown/styledown/81a1d9c/examples/screenshot.png)][example]

## Installation

``` bash
 npm install -g styledown
 styledown --help
```

## How it works

Styledown is made to work in most web development setups. It doesn't favor any framework or language or any preprocessor.

* [Document][doc] your CSS files with inline comments, or as a separate `.md` file.
* Create a file with styleguide [configuration][conf].
* Invoke `styledown *.css > styleguide.html`.
* Enjoy your styleguide! Read more about the [format][fmt].

[doc]: docs/Documenting.md
[conf]: docs/Configuration.md
[fmt]: docs/Format.md

## Quickstart guide

Here's a generic guide on getting started with Styledown on any project. We're
gonna assume that you're using Sass and that your project bundles all CSS files
into one file.

Let's assume that your files are in `css/`, and that your final styleguide will
be in `public/styleguide.html`.

```text
                    Example setup

.----------------------.     .---------------------.
| css/                 |     |                     |
|     config.md        |     |  public/            |
|     button.scss      | ==> |    styleguide.html  |
|     forms.scss       |     |                     |
|     whatever.scss    |     |                     |
'----------------------'     '---------------------'
```

### Step 1: Document

Document your project's stylesheets with inline comments, or as separate `.md`
files.

```css
/**
 * Component name:
 * `.your-component-here` - documentation on what your
 * component is goes here. Markdown is encouraged.
 *
 *     @example
 *     div.your-component-here
 *       h3 Sample code
 *       p goes here
 */

.your-component-here {
  display: block;
  /*...*/
}
```

Read more: **[Documenting ▸](docs/Documenting.md)**

### Step 2: Configure

Make a file, let's call it `config.md`. (`styledown --conf > config.md`) This
lets you define what will be in the output head/body.

```markdown
# Styleguide options

### Head

    link(rel="stylesheet" href="/assets/application.css")
    <style>
      /* styledown css */
    </style>
    <script>
      /* styledown js */
    </script>

### Body

    h1 My Awesome Styleguides
    div#styleguides(sg-content)
```

The first one (`application.css`) should point to your project's concatenated
stylesheets. The second and third one (`styledown.css` and `styledown.js`)
point to the default Styledown CSS/JS files.

Read more: **[Configuration ▸](docs/Configuration.md)**

### Step 3: Build

Invoke `styledown` to generate an HTML file. (Make sure that the extras.css is
passed on the end, since anything after the "Styleguide options" heading is ignored.)

```bash
 styledown css/*.css css/config.md > public/styleguides.html
```

### Enjoy!

Now open `public/styleguides.html` in your browser.

## Usage

Styledown generates `.html` styleguides. It can take CSS files or Markdown 
files, or a combination of the two.

__Inline CSS mode:__ Parses comments from CSS files. This is what happens when 
you pass .css, .sass, .scss, .less and .styl files.

```bash
 styledown *.css > styleguide.html
```

__Markdown mode:__ Takes Markdown files.

```bash
 styledown *.md > styleguide.html
```

## Markup format

Read more: **[Markup format ▸](docs/Format.md)**

# Markdown Syntax Guide

This document explains how to write and format text using Markdown. The examples below show the syntax and how it renders, so you can use this guide as both a reference and a learning tool.

---

## Table of Contents

- [Introduction](#introduction)
- [Headings](#headings)
- [Paragraphs and Line Breaks](#paragraphs-and-line-breaks)
- [Emphasis](#emphasis)
- [Blockquotes](#blockquotes)
- [Lists](#lists)
  - [Ordered Lists](#ordered-lists)
  - [Unordered Lists](#unordered-lists)
- [Code](#code)
  - [Inline Code](#inline-code)
  - [Code Blocks](#code-blocks)
- [Horizontal Rules](#horizontal-rules)
- [Links](#links)
- [Images](#images)
- [Tables](#tables)
- [Escaping Special Characters](#escaping-special-characters)
- [Extended Syntax](#extended-syntax)
- [Conclusion](#conclusion)

---

## Introduction

Markdown is a lightweight markup language that lets you format plain text. It's used for everything from README files to documentation. In this guide, you'll learn how to create headings, paragraphs, lists, and much more.

---

## Headings

Create headings by prefixing text with one or more hash (`#`) characters. The number of hashes indicates the level of the heading.

**Example:**

```markdown
# Heading 1

## Heading 2

### Heading 3
```

**Rendered:**

## First Level Heading

### Second Level Heading

#### Third Level Heading

---

## Paragraphs and Line Breaks

Separate paragraphs with one or more blank lines.

**Example:**

```markdown
This is the first paragraph.

This is the second paragraph.
```

To create a line break within a paragraph, end a line with two or more spaces and then press Enter.

**Example:**

```markdown
This is the first line.  
This is the second line.
```

---

## Emphasis

You can emphasize text using asterisks or underscores.

- _Italic:_ Wrap text in one asterisk or underscore.

  ```markdown
  _This text is italic_ or _this text is italic_
  ```

- **Bold:** Wrap text in two asterisks or underscores.

  ```markdown
  **This text is bold** or **this text is bold**
  ```

- **_Bold and Italic:_** Wrap text in three asterisks or underscores.

  ```markdown
  **_This text is bold and italic_**
  ```

- ~~Strikethrough:~~ Wrap text in two tildes.

  ```markdown
  ~~This text is struck through~~
  ```

---

## Blockquotes

Create blockquotes by starting a line with the greater-than sign (`>`).

**Example:**

```markdown
> This is a blockquote.
>
> It can span multiple paragraphs.
```

**Rendered:**

> This is a blockquote.
>
> It can span multiple paragraphs.

---

## Lists

### Ordered Lists

Start each item with a number and a period.

**Example:**

```markdown
1. First item
2. Second item
3. Third item
```

_Note: Numbers don't have to be sequential in the Markdown source—Markdown will render them in order._

### Unordered Lists

Start each item with a dash (`-`), asterisk (`*`), or plus (`+`).

**Example:**

```markdown
- Item one
- Item two
- Item three
```

---

## Code

### Inline Code

Wrap inline code with backticks (<code>`</code>).

**Example:**

```markdown
Use the `printf()` function.
```

_Rendered as:_  
Use the `printf()` function.

### Code Blocks

For longer code snippets, use fenced code blocks by wrapping your code in three backticks.

**Example:**

```python
def greet(name):
    print(f"Hello, {name}!")
```

_Rendered as:_

```python
def greet(name):
    print(f"Hello, {name}!")
```

---

## Horizontal Rules

Insert a horizontal rule by using three or more dashes, asterisks, or underscores on a line by themselves.

**Example:**

```markdown
---
```

---

## Links

### Inline Links

Create links with square brackets and parentheses.

**Example:**

```markdown
[Visit GitHub](https://github.com "GitHub Homepage")
```

_Rendered as:_  
[Visit GitHub](https://github.com "GitHub Homepage")

### Reference Links

Define the link separately and refer to it.

**Example:**

```markdown
[GitHub][1]

[1]: https://github.com "GitHub Homepage"
```

---

## Images

Embed images by prefixing the link with an exclamation mark.

**Example:**

```markdown
![Alt text](https://via.placeholder.com/150 "Image Title")
```

_Rendered as an image._

---

## Tables

You can create tables using pipes and hyphens.

**Example:**

```markdown
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
```

_Rendered as:_

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

---

## Escaping Special Characters

If you need to display a character that is part of the Markdown syntax, prefix it with a backslash (`\`).

**Example:**

```markdown
\# This is not a heading, but literal text.
```

_Rendered as:_  
\# This is not a heading, but literal text.

---

## Extended Syntax

Markdown processors may support extra features such as:

- **Tables:** (see above)
- **Footnotes:**

  ```markdown
  Here is a sentence with a footnote.[^1]

  [^1]: This is the footnote text.
  ```

- **Task Lists:**
  ```markdown
  - [x] Completed task
  - [ ] Incomplete task
  ```
- **Strikethrough:** (shown above)

_Note: Support for extended features may vary depending on your Markdown processor._

---

## Conclusion

This guide has covered the basics of Markdown syntax—from headings and paragraphs to links, images, and code blocks. Use this file as a reference in your projects and feel free to update it as you learn more.

Happy writing in Markdown!

---

_End of Markdown Syntax Guide_

```

```

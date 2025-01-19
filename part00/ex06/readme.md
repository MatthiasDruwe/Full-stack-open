# Ex 06

``` mermaid
sequenceDiagram
    participant browser
    participant server

    Note left of browser: User fills new note and clicks on save

    Note right of browser: The browsers starts executing the JavaScript code linked to the form submitted event
    Note right of browser: note is added to the html doc with JavaScript

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server

```
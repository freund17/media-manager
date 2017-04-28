# Media Manager

The Media-Manager should support the following features:

- Media-files are flagged with custom tags.
- One medium may have multiple or no tags.
- search function, to search in title, description and tags (included in descrition).
- It is kept track of the number of uses (last day / week / month).
- querying
    - search term
    - sorting (multiple; asc/desc)
        - title
        - number of uses (last day / week / month)
        - tag-meta (alphabetically / numerically)
    - filter
        - number of uses (last day / week / month)
        - contains tag
        - doesn't contain tag
        - tag meta-information
            - range
            - exact

## Tags

As tags are the only means to group and order files in a semantical manner, they are very important.

- a tag is set by adding it to the description of the medium
- structure
    - a tag consists of a tagname and optionally metadata
    - the tagname may only contain word characters (alphanumeric (`a-zA-Z0-9`) and underscore (`_`))
    - tagnames are case-insensitive
    - the metadata may contain every non-whitespace character except linebreak and hash (`#`)
        - exception: it is possible to put the metadata inside a pair of doublequotes (`"`), to include whitespaces and hashes
        - a doublequote may also be included by escaping it (`\"`)
        - note: using this syntax, a backslash in front of the ending doublequote needs to be escaped (`\\`) if it is to be included as part of the text instead of escaping the doublequote

    - a tag must start with the hash character (`#`) followed by the tagname
    - after the tagname a colon (`:`) followed by the metadata may follow

    - RegEx: `#(\w+)(?::(?:(\d+(?:.\d+))|"((?:(?=(\\?))\4.)*?)"|([^\s#]+)))?`
        - group #1 contains the tagname
        - group #2 contains the metainfo, if it is a number
        - group #3 contains the metainfo, if doublequotes were used
            - `\\` needs to be converted to `\`
            - `\"` needs to be converted to `"`
        - group #4 is used internally
        - group #5 contains the metainfo otherwise
- examples
    - `#y`, `#0`, `#_` - smallest valid tag
    - `#cool`
    - `#episode:12` - tagname: 'episode', additional info: '12'
    - `#series:"Attack On Titan"#season:2#episode:12#anime#cool` - the structure allows for the chaining of multiple tags without the use of spaces
- developer warning
    - tagnames are no save variable-names, as they can start with a number
    - metadata may contain any characters! Be espacially aware of XSS and Sql-Injection attacks!

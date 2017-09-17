# Media Manager

The Media-Manager should support the following features:

- Media-files are flagged with custom tags.
- One medium may have multiple or no tags.
- search function, to search in title, description and tags (included in descrition).
- It is kept track of the number of uses (last day / week / month).
- querying
  - search term
  - sorting (multiple; asc/desc)
    - tag-meta (alphabetically / numerically)
    - properties (pseudo-tags)
      - title
      - description
      - number of uses (last day / week / month)

    - examples:
      - `tagA`: sorts alphabetically asc by the meta-value of `tagA`
      - `!tagA`: sorts alphabetically desc by the meta-value of `tagA`
      - `tagA<`: sorts numerically asc by the meta-value of `tagA`
      - `tagA>`: sorts numerically desc by the meta-value of `tagA`
      - `tagA,tagB<`: sorts alphabetically asc by the meta-value of `tagA`, elements with the same meta-value of `tagA` are then sorted numerically asc by the meta-value of `tagB`

  - filter
    - contains tag
    - doesn't contain tag
    - tag meta-information
      - range
      - exact
    - properties (pseudo-tags)
      - number of uses (last day / week / month)

    - examples:
      - `tagA`: has tag `tagA`
      - `!tagA`: does not have `tagA`
      - `tagA & tagB`: has both `tagA` and `tagB`
      - `tagA & !tagB`: has `tagA` but not `tagB`
      - `(tagA & tagB) | tagC`: has `tagA` and `tagB` or has `tagC`
      - `tagA & (tagB | tagC)`: has `tagA` and either `tagB` or `tagC`
      - `tagA>5 & tagA<10`: meta-value of `tagA` is between `5` and `10`
      - `tagA>=5 & tagA<=10`: meta-value of `tagA` is between `5` and `10` or `5` or `10`
      - `tagA=5 & tagB!=10`: meta-value of `tagA` is between `5` and meta-value of `tagB` is not `10`
      - `tagA=# & tagB!=#`: meta-value of `tagA` is a number and meta-value of `tagB` is not a number
      - `tagA~"totally awesome" & tagA!~boring`: meta-value of `tagA` contains `totally awesome` and does not contain `boring`

  - full query example:
    - `SELECT * WHERE fullepisode & series="Attack on Titan" & season=2 ORDER BY episode<`: gets all episodes of "Attack on Titan", season 2 ordered asc by episode
    - `SELECT * ORDER BY _numberOfAccessesLastWeek>`: gets all content from the database, the most accessed of the week first

## Tags

As tags are the only means to group and order files in a semantical manner, they are very important.

- a tag is set by adding it to the description of the medium
- structure
  - a tag consists of a tagname and optionally metadata
  - the tagname may only contain word characters (alphanumeric (`a-zA-Z0-9`) and underscore (`_`))
  - tagnames are case-insensitive
  - tagnames starting with an underscore (`_`) are reserved for not-user-entered metadata and must be ignored by the parser
    - for example `_fileSize`, `_lastChanged` and `_numberOfAccessesLastMonth`
    - but also `_title` and `_description`
  - the metadata may contain every non-whitespace character and hash (`#`)
    - exception: it is possible to put the metadata inside a pair of doublequotes (`"`), to include whitespaces and hashes
    - a doublequote may also be included by escaping it (`\"`)
    - note: using this syntax, a backslash in front of the ending doublequote needs to be escaped (`\\`) if it is to be included as part of the text instead of escaping the doublequote

  - a tag must start with the hash character (`#`) followed by the tagname
  - after the tagname a colon (`:`) followed by the metadata may follow

  - RegEx: `#([^\W_]\w*)(?::(?:(\d+(?:\.\d+)?)|"((?:(?=(\\?))\4.)*?)"|(.+?)))?(?=\s|#|$)`
    - group #1 contains the tagname
    - group #2 contains the metainfo, if it is a number
    - group #3 contains the metainfo, if doublequotes were used
      - `\\` needs to be converted to `\`
      - `\"` needs to be converted to `"`
    - group #4 is used internally
    - group #5 contains the metainfo otherwise
- examples
  - `#y`, `#0` - smallest valid tag
  - `#cool`
  - `#episode:12` - tagname: 'episode', additional info: '12'
  - `#series:"Attack On Titan"#season:2#episode:12#fullepisode#anime#cool` - the structure allows for the chaining of multiple tags without the use of spaces
- developer warning
  - tagnames are no save variable-names, as they can start with a number
  - metadata may contain any characters! Be espacially aware of XSS and Sql-Injection attacks!

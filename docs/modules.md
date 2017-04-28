# Modules

The Media-Manager only contains the core functionality and is not runnable by itself. It also needs a few modules to be useable:

## Store-Module

Every Media-Manager instance has exactly one Store-Module.
It is responsible for persistent storage.

It may implement access to SqLite / MongoDb / MySQL / Redis or something completely different.
It could even be a multiplexer for multiple Store-Modules or a simple cache to put inbetween ones.

## Source-Module

Every Media-Manager instance has exactly one Source-Module.
It is responsible for delivering media-files to the Media-Manager.

It emitts an event when new files become available / have changed / are no longer available.
Files are passed on as stream-objects. Sources may be for example a local- / network-file or another server.
The file may even be generated on the fly.

It could also be a multiplexer for multiple Source-Modules.

## Interface-"Module"

The media-files can only be accessed via the interface exposed by the Media-Manager instance.

But you may also build your own interfaces on top of that.
These are not really "Modules" as they are completely seperate from the Media-Manager itself.
But nevertheless they are listed here to get the idea across.

An Interface-Module may implement a HTTP/S-api or tui for accessing the files.
It may even be a proxy for other Interface-Modules to add authentication and access-restriction, for example.

## Module ideas

mmm = Media Manager Module

### mmm-local-folder-source

- allows linking to data in a local directory and its sub-directories
- by default
    - A file's title is the filename
    - the directory names are the tags (for example: A file in `mediaDir/cool/anime/wink.mp4` has the title `wink` and the tags `cool` and `anime`)
- every directory or sub-directory may contain a `meta.json`
    - it may
        - remove a sub-directory from discovery
        - disable the "directory-name as tag-name" default
        - add additional tags to directories
        - add additional tags to files
        - remove tags from directories
        - remove tags form files
        - disable tag-inheritance for specific files or folders

### mmm-cdn-source

- allows linking to data from a content-delivery-network
- supports 2 modes:
    1. All media must be added manually (link, title, description, tags)
    1. Given a root url, a structure like the `local-folder-loader` is expected. In this case, a `meta.json` in every directory is required. Only files and directories mentioned in `meta.json` will be discovered.

### mmm-web-dav-source

- allows linking to a web-dav source
- Given a root url, a structure like the `local-folder-loader` is expected.

### mmm-media-hub-source

- allows linking to another media-hub
- if not forbidden by the other media hub
    - likes/dislikes will be synced
    - downloads will be synced
    - comments will be synced

module.exports = class MediaManager {
    static defaultConfig = {
        allowContains: true,
        defaultLimit: 50
    }

    constructor(store, source, config) {
        this._store = store;
        this._source = source;

        this._config = { ...defaultConfig, ...config };
    }

    /**
     * parses a filter-string into an filter-object
     * @param {string} filter filter-string
     * @return {Filter}
     */
    parseFilter(filter) {
        // example filter-strings:

        // matches all media having the tags "series", "season" and "episode" but not "highlight"
        // where the meta-info of "series" is "Attack On Titan" and the meta-info of "season" is greater than "3"
        // or
        // the medium has the flags "cool" and "new"
        '#series="Attack On Titan"#season>3#episode#highlight!|#cool#new';

        // matches all media with the properties "image" and "width"
        // and either the tag "old" or the tags "new" but not "cool"
        // where the "width" is smaller or equal "1920"
        '(#cool!#new|#old)*image*width<=1920';

        // matches all media where the title contains "hi guys" and the description does not contain "epic"
        '*title~"hi guys"*description~epic!';

        // TODO
        if(this._config.allowContains) {

        }
    }

    /**
     * parses a sort-string into a sort-object
     * @param {string} sort sort-string
     * @return {Sort}
     */
    parseSort(sort) {
        // example sort-strings:

        // sorts ascending by the meta-info of "cool" (lexicographically)
        '#cool';

        // sorts descending by the meta-info of "cool" (lexicographically)
        '#cool!';

        // sorts ascending by the meta-info of "cool" (numerically)
        '#cool<';

        // sorts descending by the meta-info of "cool" (numerically)
        '#cool>';

        // sorts ascending by the meta-info of "series" (lexicographically)
        // then ascending by the meta-info of "season" (numerically)
        // then ascending by the meta-info of "episode" (numerically)
        '#series#season<#episode<';

        // TODO
    }

    /**
     * returns a Promise resolving to an Array of mediumIds matching the passed arguments
     * @async
     * @param {string|Filter} filter filter-string or filter-object to be applied
     * @param {string|Sort} sort sort-string or sort-object to be applied
     * @param {number} limit maximum number of returned results
     * @param {number} offset skip the first *offset* results
     * @return {Array<string>}
     */
    find(filter, sort, limit, offset) {
        if(!filter)
            filter = '';

        if(!sort)
            sort = '';

        if(typeof limit !== 'number')
            limit = this._config.defaultLimit;

        if(typeof offset !== 'number')
            offset = 0;

        if(filter instanceof String)
            filter = this.parseFilter(filter);

        if(sort instanceof String)
            sort = this.parseSort(sort);
        
        // TODO
    }

    /**
     * returns a stream to the medium data
     * @param {string} mediumId
     * @return {ReadableStream} medium
     */
    get(mediumId) {
        // return mediumStream;
    }

    /**
     * returns information about the medium / media
     * @async
     * @param {string|Array<string>} mediumId
     * @return {MediumInfo|Array<MediumInfo>} mediumInfo-Object
     */
    info(mediumId) {
        if(mediumId instanceof Array)
            return Promise.all(mediumId.map(id => this.info(id)));

        return Promise.resolve({
            id: mediumId,
            title: 'test',
            description: 'toll\n#myTag#myTagB:withMeta',
            tags: [
                {
                    name: 'myTag',
                    meta: null
                },
                {
                    name: 'myTagB',
                    meta: 'withMeta'
                }
            ]
        });
    }
};

import { ReactIndexedDB } from 'react-indexed-db';

export default class IndexDBService {

    constructor(dbName, dbVersion = 1) {

        if (dbName === undefined)
            throw new Error('You need define a name for your DB');

        this._dbName = dbName;
        this._dbVersion = parseInt(dbVersion);
        this._dbInstance = new ReactIndexedDB(this._dbName, this._dbVersion);
    }

    /**
     * 
     * Get all data from an IndexDB Store
     *
     * @param {String}      storeName       Name of Database store
     * 
     * @return {Promise} Return a Promise from indexDB operation
     */
    getAllFromStore(storeName) {
        return this._dbInstance.getAll(storeName);
    }


    /**
     * 
     * Get all data from an IndexDB Store
     *
     * @param {String}      storeName       Name of Database store
     * @param {String}      key             The key to be searched
     * 
     * @return {Promise} Return a Promise from indexDB operation
     */
    getByKey(storeName, key) {
        return this._dbInstance.getByKey(storeName, key);
    }


    /**
     * 
     * Get a data from an IndexDB Store
     *
     * @param {String}      storeName       Name of Database store
     * @param {String}      indexName       Index identification of Database store
     * @param {String}      value           A store field value to be searched
     * 
     * @return {Promise} Return a Promise from indexDB operation
     */
    getByIndex(storeName, indexName, value) {
        return this._dbInstance.getByIndex(storeName, indexName, value);
    }


    /**
     * 
     * Create a new store to the IndexDB
     *
     * @param {String}              storeName         Name of Database store
     * @param {Object}              storeConfig       Object with store configuration
     * @param {Array.<Object>}      storeFields       Array with fields configuration
     * 
     * @return {Promise} Return a Promise from indexDB operation
     */
    createNewStore(storeName, storeConfig, storeFields) {
        return this._dbInstance.openDatabase(this._dbVersion, evt => {
            let objectStore = evt.currentTarget.result.createObjectStore(storeName, storeConfig);

            storeFields.forEach(field => {
                objectStore.createIndex(field.name, field.keyPath, field.config);
            });
        });
    }


    /**
     * 
     * Add a new object in IndexDB Store
     *
     * @param {String}      storeName       Name of Database store
     * @param {Object}      data            Object with all store fields
     * 
     * @return {Promise} Return a Promise from indexDB operation
     */
    addNewFieldValue(storeName, data) {
        return this._dbInstance.add(storeName, data);
    }

    
    /**
     * 
     * Remove an item from IndexDB Store
     *
     * @param {String}      storeName       Name of Database store
     * @param {String}      key             The key value from item of Database store to delete
     * 
     * @return {Promise} Return a Promise from indexDB operation
     */
    removeItemFromStoreByKey(storeName, key) {
        return this._dbInstance.delete(storeName, key);
    }


    /**
     * 
     * Clear all data from an IndexDB Store
     *
     * @param {String}      storeName       Name of Database store
     * 
     * @return {Promise} Return a Promise from indexDB operation
     */
    clearStore(storeName) {
        return this._dbInstance.clear(storeName);
    }


    /**
     * 
     * Clear all data from an IndexDB Store
     *
     * @param {String}      storeName           Name of Database store
     * @param {String}      value               The new value to update
     * @param {String}      key                 The key value from item of Database store to update
     * @return {Promise} Return a Promise from indexDB operation
     */
    updateStoreIten(storeName, value, key) {
        return this._dbInstance.update(storeName, value);
    }
}
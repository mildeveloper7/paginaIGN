/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */


/** api: example[wms-capabilities]
 *  WMS Capabilities Store
 *  ----------------------
 *  Create layer records from WMS capabilities documents.
 */

var store;
Ext.onReady(function() {
    
    create a new WMS cap http://www.ign.gob.gt/geoserver/IGN/wmsabilities store
	store = new GeoExt.data.WMSCapabilitiesStore({
        url: "data/wmscap.xml"
    });
	store = new GeoExt.data.WMSCapabilitiesStore({
        url: "http://www.ign.gob.gt/geoportal/wmscap.xml"
    });
    // load the store with records derived from the doc at the above url
    store.load();

    // create a grid to display records from the store
    var grid = new Ext.grid.GridPanel({
        title: "WMS Capabilities",
        store: store,
        columns: [
            {header: "Titulo", dataIndex: "title", sortable: true},
            {header: "Nombre", dataIndex: "name", sortable: true},
            //{header: "Queryable", dataIndex: "queryable", sortable: true, width: 70},
			//{header: "metadata", dataIndex: "metadataURLs", width: 150},			
            {id: "description", header: "Description", dataIndex: "abstract", sortable: true, width: 300}			
        ],
        autoExpandColumn: "description",
        renderTo: "capgrid",
        height: 300,
        width: 950,
        listeners: {
            rowdblclick: mapPreview
        }
    });
    
    function mapPreview(grid, index) {
        var record = grid.getStore().getAt(index);
        var layer = record.getLayer().clone();
        
        var win = new Ext.Window({
            title: "Preview: " + record.get("title"),
            width: 512,
            height: 256,
            layout: "fit",
            items: [{
                xtype: "gx_mappanel",
                layers: [layer],
                extent: record.get("llbbox")
            }]
        });
        win.show();
    }

});

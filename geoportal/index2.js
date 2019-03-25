	var mapPanel;
		Ext.onReady(function() {
// Definicion variable para visualizacion del MAPA Bounding box 
 
      var sm = new OpenLayers.Projection("EPSG:900913");  //Spherical Mercator
      var wgs = new OpenLayers.Projection("EPSG:4326");  //WGS84
 
  // Bounding box oordinates for your chosen country (i.e.,guatemala) & The World
 
 var ctryBbox = new OpenLayers.Bounds(-98.40,9.200,-82.09,18.122).transform(wgs, sm);
 var worldExtent = new OpenLayers.Bounds(-92.24,13.739,-88.09,17.122).transform(wgs, sm);
  
		var opciones = {
					units:'m',
					//projection: wgs,
					//maxExtent:new OpenLayers.Bounds(-98.40,9.200,-82.09,18.122),					  
					//maxExtent:new OpenLayers.Bounds(-92.24,13.739,-88.09,17.122),  
					  maxExtent: ctryBbox,
					//maxResolution: 1000,	
					//umZoomLevels: 40,
					
					//controls: []					
				};	
// CAPA BASE - BASELAYERS
		var ghyb = new OpenLayers.Layer.Google("Google Satelite",{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20});
		var gphy = new OpenLayers.Layer.Google("Google Relieve",{type: google.maps.MapTypeId.TERRAIN});
		var gpte = new OpenLayers.Layer.Google("Google Carreteras",{type: google.maps.MapTypeId.ROADS});
		var osm  = new OpenLayers.Layer.OSM("OpenStreetMap");

		var Cartobasica = new OpenLayers.Layer.WMS("IGN-WMS Cartografia Basica",
			"http://www.ign.gob.gt/geoserver/cartografia_basica/wms", {
				layers: [			
					"Division politica ADministrativa",					
					"Red de CArreteras",					
					"Hidrografia LIneal"					
				],
				transparent: true,
				checked: false,
			}, {isBaseLayer: false,	
				checked: false,	
				buffer: 0
			} 
		);
		
		var Departamentos = new OpenLayers.Layer.WMS("IGN-WMS Departamentos 2014",
			"http://www.ign.gob.gt/geoserver/cartografia_basica/wms", {
				layers: [			
					"Departamentos"
				],
				transparent: true,
				checked: false,
			}, {isBaseLayer: false,	
				checked: false,	
				buffer: 0
			} 
		);	
		
		var Tematicos = new OpenLayers.Layer.WMS("SAA-WMS",
			"http://geoportal.saa.gob.gt/geoserver/SAA/wms", {
				layers: [
					"Ingresados 2015",
					"Finalizados 2015"					
				],
				transparent: true,
				checked: false,				
			}, {isBaseLayer: false,
				checked: false,				
				buffer: 0	
			}
		);				
	
		var map= new OpenLayers.Map(opciones);  // Crea objeto MAP y hace referencia a la variable opciones
		
		map.displayProjection= new OpenLayers.Projection("EPSG:4326");
		map.addControl(new OpenLayers.Control.MousePosition());
		map.addControl(new OpenLayers.Control.ScaleLine()); 
		map.addControl(new OpenLayers.Control.OverviewMap()); 
		map.addControl(new OpenLayers.Control.KeyboardDefaults()); 
		map.addControl(new OpenLayers.Control.Permalink()); 
			

/**** SHORTCUTS ATAJOS********/
var store = new Ext.data.SimpleStore({
             fields: ['value', 'text', 'bbox'],
             data : [
					['1', 'Alta Verapaz', new OpenLayers.Bounds(-10110058.0442878,1702818.88495926,-9952905.51348353,1813273.28630003)],
					['2', 'Baja Verapaz', new OpenLayers.Bounds(-10109453.1123675,1674207.86659683,-10002244.3913834,1729763.43616768)],
					['3', 'Chimaltenango', new OpenLayers.Bounds(-10144372.0509621,1617061.74910698,-10087682.6260597,1682062.33453114)],
					['4', 'Chiquimula', new OpenLayers.Bounds(-9987629.97987597,1620678.73040189,-9922117.05478604,1683419.51143417)],
					['5', 'El Progreso', new OpenLayers.Bounds(-10063901.7244623,1651026.88052044,-9995238.47644296,1706819.89872528)],
					['6', 'Escuintla', new OpenLayers.Bounds(-10190029.1556696,1563959.54132815,-10083258.634885,1628271.37037196)],
					['7', 'Guatemala', new OpenLayers.Bounds(-10103647.4453292,1602028.29020454,-10042340.2521953,1679371.71638733)],
					['8', 'Huehuetenango', new OpenLayers.Bounds(-10254506.5056755,1705219.14667056,-10135315.0645836,1813332.86148572)],
					['9', 'Jalapa', new OpenLayers.Bounds(-10052143.9669934,1622475.00158374,-9979254.45345434,1674616.81033888)],
					['10', 'Jutiapa', new OpenLayers.Bounds(-10051848.9882388,1544340.40268616,-9962984.05450189,1638376.97434912)],
					['11', 'Quetzaltenango', new OpenLayers.Bounds(-10256896.9599568,1630931.63574405,-10175058.5059756,1715279.8449402)],
					['12', 'Quiche', new OpenLayers.Bounds(-10166394.2044632,1664200.5181066,-10065381.8485582,1813332.86148572)],
					['13', 'Retalhuleu', new OpenLayers.Bounds(-10260008.362074,1596123.26584853,-10187571.0265015,1656294.85567544)],
					['14', 'Sacatepequez', new OpenLayers.Bounds(-10116807.3412087,1617440.56771915,-10086921.6514352,1657527.35994133)],
					['15', 'San Marcos', new OpenLayers.Bounds(-10268136.8208523,1630398.90408405,-10193344.427524,1738080.71704249)],
					['16', 'Santa Rosa', new OpenLayers.Bounds(-10093922.8125165,1549949.13819207,-10025203.6592599,1632143.56061043)],
					['17', 'Solola', new OpenLayers.Bounds(-10186455.7276562,1634138.54115729,-10138125.5508491,1677267.04650925)],
					['18', 'Suchitepaquez', new OpenLayers.Bounds(-10217639.7603054,1579306.32506541,-10140466.9979523,1655365.18258331)],
					['19', 'Totonicapan', new OpenLayers.Bounds(-10191766.2380506,1668780.86978556,-10149721.3922545,1718285.41649664)],
					['20', 'Zacapa', new OpenLayers.Bounds(-10007588.6009496,1659460.82989529,-9924454.10312372,1723544.90083946)],
					['21', 'Peten', new OpenLayers.Bounds(-10179556.8057859,1786712.5590049,-9924296.5214163,2016426.65726057)],
					['22', 'Izabal', new OpenLayers.Bounds(-9977212.71769464,1697032.2408194,-9820772.18380363,1800826.79626651)]
					 ],
			sortInfo: {
    field: 'text',
    direction: 'ASC'
}
         }); 
		  
    var deptoSelector = new Ext.form.ComboBox({
        store: store,
        emptyText: "Departamento de...",
		name: 'shortcuts',
        hiddenName: '',
        valueField: 'value',
        displayField:'text',
        editable: false,
        triggerAction: 'all', 
        mode: 'local',
		triggerAction: 'all',
        lazyRender: true,
        width: 200
    });
	        
    deptoSelector.on('select', 
        function(combo, record, index) {
            map.zoomToExtent(record.data.bbox);
        },
        this
    );
				
				
/*****************DEFINICION DE BARRA DE HERRAMIENBTAS ************/
		  var createTbarItems = function(map) {
				var actions = [];
				actions.push(new GeoExt.Action({
					//text: "    Mover",
					iconCls: "pan",							
					map: map,
					pressed: true,
					toggleGroup: "tools",
					allowDepress: false,
					tooltip: "Navegar",
					control: new OpenLayers.Control.Navigation()																			
				}));
				actions.push(new GeoExt.Action({
					//text: "   Zoom+",
					iconCls: "zoomin",
					map: map,
					toggleGroup: "tools",
					allowDepress: false,
					tooltip: "Acercarse",
					control: new OpenLayers.Control.ZoomBox({
				    out: false,
					})
				}));
					actions.push(new GeoExt.Action({
					//text: "Zoom-",
					iconCls: "zoomout",
					map: map,
					toggleGroup: "tools",
					allowDepress: true,
					tooltip: "Alejarse",
					control: new OpenLayers.Control.ZoomBox()
					
				}));
				var ctrl = new OpenLayers.Control.NavigationHistory();
				map.addControl(ctrl);
				actions.push(new GeoExt.Action({
					//text: "Regresar",
					control: ctrl.previous,
					iconCls: "back",
					tooltip: "vista anterior",
					disabled: true
				}));
				actions.push(new GeoExt.Action({
					//text: "   Siguiente",
					control: ctrl.next,
					iconCls: "next",
					tooltip: "vista siguiente",
					disabled: true
				}));
		
				var Control_Lineal=new OpenLayers.Control.Measure(OpenLayers.Handler.Path,{eventListeners:{measure:function(event){Ext.Msg.alert("Distancia",event.measure.toFixed(3)+" "+event.units);}},persist:true,geodesic:true});
				actions.push(new GeoExt.Action({
					//text: "  Distancia",
					tooltip:'Medir Distancia',
					iconCls:'medirdistancia',
					control:Control_Lineal,
					map:map,
					toggleGroup:'tools',
					group:'tools'}));

					
				var Control_Poligonal=new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon,{eventListeners:{measure:function(event){Ext.Msg.alert("Area",event.measure.toFixed(3)+" "+event.units+"Ã‚Â²");}},persist:true,geodesic:true});
				actions.push(new GeoExt.Action({
					//text: "  Area",
					tooltip:'Medir Area',
					iconCls:'medirarea',
					control:Control_Poligonal,
					map:map,
					toggleGroup:'tools',
					group:'tools'}));	
			
// Funcion GetFeatrueInfo Popup
//layerUrls: 'http://www.ign.gob.gt/geoserver/cartografia_basica/wms,http://geoportal.saa.gob.gt/geoserver/SAA/wms',

					var info = new OpenLayers.Control.WMSGetFeatureInfo({						
						url: 'http://geoportal.saa.gob.gt/geoserver/SAA/wms',						
						eventListeners: {
							getfeatureinfo: function(event) {
								map.addPopup(new OpenLayers.Popup.FramedCloud(
									"chicken", 
									map.getLonLatFromPixel(event.xy),
									null,
									event.text,
									null,
									true
								));
							}
						}
					}); 
				actions.push(new GeoExt.Action({
					text: "Info",
					tooltip:'Info',
					iconCls:'Info',
					control:info,
					map:map,
					toggleGroup:'tools',
					group:'tools'}));									
				return actions;
			};
		
		function show(evt){window.txt=evt.text;
		var match=evt.text.match(/<body>([\s\S]*)<\/body>/);
		var html;
		if(match&&!match[1].match(/^\s*$/)){
		var popup=new GeoExt.Popup({title:'Informacion',
								  width:240,
								  height:180,
								  autoScroll:true,
								  map:map,
								  location:map.getLonLatFromViewPortPx(evt.xy),
								  x:evt.xy.x,
								  y:evt.xy.y,
								  html:evt.text,
								  maximizable:true,
								  collapsible:true,
								  draggable:true});
						popup.show();}}
						
		// FINALIZAR BARRA DE HERRAMIENTAS						
		
// ---- FUNCION QUE DESPLIEGA LOS SHAPES EN EL PANE CENTRAL MAPA ----
		mapPanel = new GeoExt.MapPanel({
            region: "center", 
			title: "Visor de Mapas",			
            map: map,
			extent: worldExtent,
			margins: "5 5 5 5",
			split: true,
			/***Definicion de capas bases y variables de geoservicios que estaran disponibles en este visor ****/
			layers: [ghyb, osm, gpte, gphy, Tematicos, Cartobasica, Departamentos],
			tbar: [createTbarItems(map), '|| Zoom en: ',deptoSelector, 		/** LLamado de barra de herramientas panel central ***/
				{
				//iconCls:'info',
				//title: 'info',
				//toggleGroup:'tools',
				//group:'tools',
				//map:map,
				//tooltip: "TOOLTIP",				
				handler:function f(){control_feature.activate();}}]		
			});	
 		
/**************************INICIO FUNCICION QUE CREA EL ARBO DE CARPETAS **************************/
  // create our own layer node UI class, using the TreeNodeUIEventMixin
    var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());
        
    // using OpenLayers.Format.JSON to create a nice formatted string of the
    // configuration for editing it in the UI
    var treeConfig = [{
        nodeType: "gx_baselayercontainer",
    },
	{
		nodeType: "gx_layer",
		layer: "SAA-WMS",
		isLeaf: false,
		checked: false,
		expanded: true,		
		loader: {
			param: "LAYERS", baseAttrs:{checked:false}
		}
	},			
	{
        nodeType: "gx_layer",
        layer: "IGN-WMS Cartografia Basica",
        isLeaf: false,	
		checked: false,		
		expanded: true,
        loader: {
            param: "LAYERS", baseAttrs:{checked:false}
        }
    },
	{
        nodeType: "gx_layer",
        layer:"IGN-WMS Departamentos 2014",
 		isLeaf: false,
		checked: false,
		expanded: true,		
		loader: {
			param: "LAYERS", baseAttrs:{checked:false}
        }
    }
	];
    
    treeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);

    /*****Crea la estructura del arbol de carpetas ****/ 
    var LayerTree = new Ext.tree.TreePanel({
        border: true,
        region: "east",
        title: "Mapas",
        //width: 250,
		height: 400,
        split: true,
        collapsible: true,
        collapseMode: "mini",
        autoScroll: true,
		expanded: false,		
        /*plugins: [
            new GeoExt.plugins.TreeNodeRadioButton({
                listeners: {
                    "radiochange": function(node) {
                        alert(node.text + " is now the active layer.");
                    }
                }
            })
        ],*/
        loader: new Ext.tree.TreeLoader({
            // applyLoader has to be set to false to not interfer with loaders
            // of nodes further down the tree hierarchy
            applyLoader: false,				
            uiProviders: {
                "layernodeui": LayerNodeUI
            }
        }),
        root: {
            nodeType: "async",
            // the children property of an Ext.tree.AsyncTreeNode is used to
            // provide an initial set of layer nodes. We use the treeConfig
            // from above, that we created with OpenLayers.Format.JSON.write.
            children: Ext.decode(treeConfig) 			
        },
        listeners: {
            "radiochange": function(node){
                alert(node.layer.name + " is now the the active layer.");
            }
        },
        rootVisible: false,
        lines: false, 
    });
//	------------------------------FIN FUNCIÃƒâ€œN DE PRUEBA -----------------------------------------------	
// FUNCIÃƒâ€œN QUE DESPLIEGA EL CUADRO DE LEYENDAS	
	
 var metadatos = new Ext.Panel({
    title: "Metadatos y geoservicios",
	//region:"south",
	html: '<p><font face="arial" size="2" color="blue" ><a href="http://geoportal.saa.gob.gt/metadatos/" target="_blank" >Metadatos</a></p> <font size="1">Informaci&oacute;n de las capas tem&aacute;ticas</p> <p><font arial size="2" color="blue" ><a href="http://geoportal.saa.gob.gt/geoservicios/geoservicios.html" target="_blank" >Geoservicios</a></p> <font size="1">Servicios WMS(en construcciÃ³n)</p>',
    split: true,
    collapsible: true,
	collapsed: true,
    height: 100,
	region:'south',
    minSize: 100,
    autoScroll: true
    });	
	
	var legendPanel = new GeoExt.LegendPanel({
	region: "South",
	title: "Leyenda",
	dynamic: true,
	layerStore: mapPanel.layers,
	collapsible: true,
	autoScroll: true,
	split:true,
	height: 250
	});


	
/****Funcion que crea el Viewport en donde estara hospedado el LayerTree y legendPanel  ****/

		new Ext.Viewport({
        layout: "border",
		hideBorders: true,
        items: [{		// Definicion region Norte Superior de visor, el banner de la pagina
            region: "north",
            contentEl: "title", //hacer referencia al contenido de la variable TITLE
            height: 80 //define alto del banner
			},  
			mapPanel, 
			{
				region: "west",
				split: true, 
				width: 200, // define el ancho del visor de mapa
	
				//layout: "accordion",
				collapsible: false,
				checked: false,
				items:[						
					metadatos,
					LayerTree, // llama tree
					legendPanel,
					]                      
			}]
		});

    });
 
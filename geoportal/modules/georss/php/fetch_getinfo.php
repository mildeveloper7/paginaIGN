﻿<?php

/*version message*/

include("../../../php_source/proxies/proxy_gml.php");

class getinfoGeoRSS
{
	function getinfoGeoRSS($data)
	{
		switch($data["getWhat"])
		{
			case "geometry":
				$this->createGeometryTable($data);
			break;
			
			case "attributes":
				$this->createInfoTable($data);
			break;
			
			case "georss":
				$this->currentGeoRSS($data);
			break;
		}
	}
	
	function currentGeoRSS($data)
	{
		$filename = $data["georss"];
	
		session_start();

		$sid=session_id();

		if ($data["georssType"]=="file")
		{
			$georss_url = $GLOBALS["_default_portal_url"]."modules/georss/tmp_uploads/".$sid."/".$filename;
		}
		else
		{
			$georss_url=$filename;
		}
		
		$gml = file_get_contents_safe($georss_url,false);
		
		$dom_xml=new DOMDocument();
		
		$dom_xml->loadXML($gml);
		
		$dom_xml_El = $dom_xml->documentElement;
		
		$placemarksCount=$dom_xml->getElementsByTagName("item")->length;
		
		$nodes = array();
		
		$i=0;
		foreach ($dom_xml->getElementsByTagName('item') as $node) {
		
			if($i!=$data["featureId"])
			{
				$nodes[] = $node;
			}
			$i++;
		}
		
		foreach ($nodes as $node) {
			$node->parentNode->removeChild($node);
		}
		
		echo $dom_xml->saveXML();
		
		session_destroy(); 
	
	}
	
	function createInfoTable($data)
	{
	
		$filename = $data["georss"];
		
		session_start();

		$sid=session_id();
		
		if ($data["georssType"]=="file")
		{
			$georss_url = $GLOBALS["_default_portal_url"]."modules/georss/tmp_uploads/".$sid."/".$filename;
		}
		else
		{
			$georss_url=$filename;
		}
		
		$gml = file_get_contents_safe($georss_url,false);
		
		$dom_xml=new DOMDocument();
		
		$dom_xml->loadXML($gml);
		
		$namePlaceMark=$dom_xml->getElementsByTagName("item")->item($data["featureId"])->getElementsByTagName("title")->item(0)->nodeValue;
		
		$description=$dom_xml->getElementsByTagName("item")->item($data["featureId"])->getElementsByTagName("description")->item(0)->nodeValue;
				
		$attGridHTML=proxy_GML::createAttributeHTML($namePlaceMark."<br>".$description);

		session_destroy(); 
		
		print_r($attGridHTML);
		
	}
	
	function createGeometryTable($data)
	{
		$filename = $data["georss"];
		
		session_start();

		$sid=session_id();

		if ($data["georssType"]=="file")
		{
			$georss_url = $GLOBALS["_default_portal_url"]."modules/georss/tmp_uploads/".$sid."/".$filename;
		}
		else
		{
			$georss_url=$filename;
		}
		
		$gml = file_get_contents_safe($georss_url,false);
		
		$dom_xml=new DOMDocument();
		
		$dom_xml->loadXML($gml);
		
		$placemarksCount=$dom_xml->getElementsByTagName("item")->item($data["featureId"])->getElementsByTagName("point")->length;
		
		$placemarks=$dom_xml->getElementsByTagName("item")->item($data["featureId"])->getElementsByTagName("point");
		
		if ($placemarksCount==0)
		{
			$placemarksCount=$dom_xml->getElementsByTagName("item")->item($data["featureId"])->getElementsByTagName("linestring")->length;
			
			$placemarks=$dom_xml->getElementsByTagName("item")->item($data["featureId"])->getElementsByTagName("linestring");
		}
		if ($placemarksCount==0)
		{
			$placemarksCount=$dom_xml->getElementsByTagName("item")->item($data["featureId"])->getElementsByTagName("polygon")->length;
			
			$placemarks=$dom_xml->getElementsByTagName("item")->item($data["featureId"])->getElementsByTagName("polygon");
		}
		
		for($i=0;$i<$placemarksCount;$i++)
		{
			$eachCoord=$placemarks->item($i)->nodeValue;
		
			$coordsArray=explode(",",$eachCoord);
			
			$geom=array();
		
			foreach($coordsArray as $key=>$value)
			{
				$coords=explode(" ",$value);
				
				$geom[]=array("x"=>$coords[0],"y"=>$coords[1]);
			}
		
			$parts[]=$geom;
		
		}
		
		$langheadersVars=get_class_vars(proxy_GML);
				
		$langheaders=$GLOBALS["_getFeatureInfoTables"];
				
		$language=strtoupper($_REQUEST["lang"]);
				
		switch($language)
		{
			case "EN":
				$LHeaders=$langheaders["EN"];
			break;
					
			default:
				$LHeaders=$langheaders["GR"];
			break;
		
		}
		
		$geomGrid=proxy_GML::createGeometryGridFromArray($parts,$LHeaders,"EPSG:4326");
			
		$geomGridHTML=proxy_GML::createGeometryHTML($geomGrid);
		
		session_destroy();
	
		print_r($geomGridHTML);
	}
	

}

$georssCls=new getinfoGeoRSS($_REQUEST);

?>
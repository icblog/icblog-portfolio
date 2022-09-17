<?php

namespace App\Lib;

class AjaxPagination{
      
      private $totalRowsCount;
	  private $resultPerPage;
	  private $pagenum;
	  private $last;
	  private $StartFrom;
      
        public function __construct($params){
	$this->totalRowsCount = $params["totalRows"];
        $this->resultPerPage = $params["pageRows"];
        $this->pagenum = $params["pagenum"];
        
      }
     
      public function returnOffset(){
		    
		$this->last = ceil($this->totalRowsCount/$this->resultPerPage);
		
		          if($this->last < 1){
	                 $this->last = 1;
                    }
				  
				  if ($this->pagenum < 1) { 
				       $this->pagenum = 1; 
			        } else if ($this->pagenum > $this->last) { 
				       $this->pagenum = $this->last; 
                  }
          $this->StartFrom = ($this->pagenum - 1) * $this->resultPerPage;
				   
	      return $this->StartFrom;	   

       }// END METHOD returnOffset
	  
        public function returnLast(){
                    
                return $this->last;

        }// END METHOD returnLast
	  	  

        public function returnPageNumberOf(){
                    
            return "Page <b>$this->pagenum</b> of <b>$this->last</b>";

        }// END METHOD returnPageNumberOf
}

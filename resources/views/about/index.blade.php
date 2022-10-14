@extends("layouts.layout")
@section("content")
@section('title', 'about me')
<section>
<div class="container">
	
<div class="content-wrapper row">
	 <div class="col-md-9 mx-auto text-center mb-4">
      @include('layouts.page-intro')
	   <p>Hi again and thank you for taking the time to check out my personal website, read more about below. </p>
</div><!-- End col-md-9 div --> 
</div><!-- End content-wrapper row div--> 

  <div class="row">
     <div class="tab-heading-desktop text-center col-md-4">
     <h5 rel="tab1" class="about-h5-intro">History  
         <span class="about-arrow-down"> <i class="fa fa-arrow-down"></i></span>
         <span class="about-arrow-up"> <i class="fa fa-arrow-up"></i></span>
        </h5>
     </div><!-- End col-md-4 div -->
     <div class="tab-heading-desktop text-center col-md-4">
       <h5 rel="tab2" class="about-h5-intro">Experience/Projects 
         <span class="about-arrow-down"> <i class="fa fa-arrow-down"></i></span>
         <span class="about-arrow-up"> <i class="fa fa-arrow-up"></i></span>
      </h5>
     </div><!-- End col-md-4 div -->
     <div class="tab-heading-desktop text-center col-md-4">
       <h5 rel="tab3" class="about-h5-intro">Skills  
         <span class="about-arrow-down"> <i class="fa fa-arrow-down"></i></span>
         <span class="about-arrow-up"> <i class="fa fa-arrow-up"></i></span>
       </h5>
     </div><!-- End col-md-4 div -->
     <div class="about-centent-tabs col-md-12">
       <div class="tab_container">
      <h5 rel="tab1" class="tab-heading-mobile about-h5-intro">History  
         <span class="about-arrow-down"> <i class="fa fa-arrow-down"></i></span>
         <span class="about-arrow-up"> <i class="fa fa-arrow-up"></i></span>
      </h5>
    <div id="tab1" class="tab-content-wrapper-outter">
      <div class="tab-content-wrapper-inner">
           <p>Around 2015 my interest in web tech became stronger and therefore decided to take my first coding lessions in HTML & Javascript on  <a class="w3c-link" href="https://www.w3schools.com/" rel="nofollow" target="_blank">w3schools website</a> and ever since I produced the famous <strong>"Hello World"</strong> to the console of my first application I knew I have found a new hobby.</p>
            <p>What started as hobby and a simple <strong>"Hello World"</strong> application has become a full blown passion of mine as years gone by and has offered me opportunity to constantly learn and further develope my skills in solving complex logic behind creating web applications.</p> 
      </div>
     </div>
  <!-- #tab1 -->
  <h5 rel="tab2" class="tab-heading-mobile about-h5-intro">Experience/Projects 
         <span class="about-arrow-down"> <i class="fa fa-arrow-down"></i></span>
         <span class="about-arrow-up"> <i class="fa fa-arrow-up"></i></span>
        </h5>
    <div id="tab2" class="tab-content-wrapper-outter">
     <div class="tab-content-wrapper-inner row">
           <div class="col-md-12">
            <p>Below are a few projects I have completed over the course of learning to code.</p>
           </div><!-- end col-md-12 div -->
           <div class="col-md-6">
           <div class="box-shadow project-detail">
                <img src="{{ asset('imgs/adom.jpg') }}" class="project-img" alt="Adom Ballons"/>
                <p>Responsive event decoration website for a client to showcase their work.<br/>
                <strong>Key features:</strong><br/>
                  <span class="tech-stack-name">Responsive . </span>
                  <span class="tech-stack-name"> User Registration & Authentication . </span>
                  <span class="tech-stack-name"> Admin CRUD . </span>
                  <span class="tech-stack-name"> Star Rating system</span>
                 <br/>
                <strong>Main tech stack:</strong><br/>
                <span class="tech-stack-name">HTML . </span>
                <span class="tech-stack-name">Scss .</span>
                <span class="tech-stack-name">Javascript .</span>
                <span class="tech-stack-name">Bootstrap . </span>
                <span class="tech-stack-name">Php . </span>
                <span class="tech-stack-name">Mysql .  </span>
                <span class="tech-stack-name">Laravel </span>
                
                <span class="source-link-wrapper"><a href="https://adomballoons.42web.io" target="_blank"><strong>Site link</strong></a> <strong>.</strong> <a href="https://github.com/icblog/icblog-portfolio" target="_blank"><strong>Source code</strong></a></span> 
                </p>
           
             </div>
           </div><!-- end col-md-6 div -->
           <div class="col-md-6">
           <div class="box-shadow project-detail">
                <img src="{{ asset('imgs/icblog.png') }}" class="project-img" alt="Ishop"/>
                <p>This is the site you're browsing, I showcase my skills and what I know so far here with a
                  blog section to give something back to the online community that has been a huge part of my coding journey.</p>
                  <strong>Key features:</strong><br/>
                  <span class="tech-stack-name">Responsive . </span>
                  <span class="tech-stack-name"> User Registration & Authentication . </span>
                  <span class="tech-stack-name"> Blog .</span>
                  <span class="tech-stack-name"> Admin  CRUD </span>
                <br/>
                  <strong>Main tech stack:</strong><br/>
                <span class="tech-stack-name">HTML . </span>
                <span class="tech-stack-name">Scss .</span>
                <span class="tech-stack-name">Javascript .</span>
                <span class="tech-stack-name">Bootstrap . </span>
                <span class="tech-stack-name">Php . </span>
                <span class="tech-stack-name">Mysql .  </span>
                <span class="tech-stack-name">Laravel </span>
                
                <span class="source-link-wrapper"><a href="https://github.com/icblog/icblog-portfolio" target="_blank"><strong>Source code</strong></a></span> 
                </p>
              
              </div>
           </div><!-- end col-md-6 div -->
           
     </div>
  </div>
  <!-- #tab2 -->
     <h5 rel="tab3" class="tab-heading-mobile about-h5-intro">Skills  
        <span class="about-arrow-down"> <i class="fa fa-arrow-down"></i></span>
        <span class="about-arrow-up"> <i class="fa fa-arrow-up"></i></span>
      </h5>
    <div id="tab3" class="tab-content-wrapper-outter">
      <div class="tab-content-wrapper-inner pl-4 pr-4">
      <p>I'm constantly learning new stack to add onto my skills however, below are what I'm currently familiar with.</p>
      <div class="row">
           <div class="col-md-6">
               <div class="box-shadow skill-detail project-detail">
               <p class="skills-heading-p">Languages</p>
               <span>Html/Html5</span> .
                  <span>Css/Css3/Scss</span> .
                 <span>JavaScript</span> .
                  <span>Php</span> 
              </div>
             </div>
          
            <div class="col-md-6">
              <div class="box-shadow skill-detail project-detail">
                <p class="skills-heading-p">Frameworks</p>
                <span>Laravel/Blade</span> .
                <span>Bootstrap</span> .
                  <span>Jquery/Ajax</span> 
                  
               </div>
             </div>
           </div><!-- end row div -->

            <div class="row"> 
              <div class="col-md-6">
              <div class="box-shadow skill-detail project-detail">
                <p class="skills-heading-p">Database & Drivers</p>
                  <span>Mysql/PhpMyAdmin</span> .
                  <span>MongoDB</span>
                </div>
             </div>

             <div class="col-md-6">
              <div class="box-shadow skill-detail project-detail">
                <p class="skills-heading-p">Tools & Systems</p>
                <span>Npm</span> .
                <span>Composer</span> .
                  <span>Git/Github</span> .
                  <span>VS code</span>
               </div>
             </div>
             
             </div><!-- end row div -->
    </div>
       
     </div>
  <!-- #tab3 -->
 
</div>
<!-- .tab_container -->
</div>
  </div><!-- End col-md-12 div -->
  </div><!-- End row div --> 	
</div><!-- End container div -->
</section>





@endsection
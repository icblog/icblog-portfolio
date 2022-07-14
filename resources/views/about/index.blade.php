@extends("layouts.layout")
@section("content")
@section('title', 'about me')
<section>
  <div class="container">
    <div class="about-wrapper row pt-5">
       <div class="col-md-12">
        @include('layouts.page-intro')
        <p>Hi again and thank you for taking the time to check out my personal website, read more about me below. </p>
       </div> <!-- end col-md-12 div -->
    </div> <!-- end row div -->
  </container> <!-- end row div -->
</section>
<section>
  <div class="container">
    <div class="row">
       <div class="col-md-12">
        <div>
        <h5 class="pt-3 about-h5-intro" data-toggle="collapse" data-target="#history">History </h5><span class="about-arrow-down"> <i class="fa fa-arrow-down"></i></span>
        <span class="about-arrow-up"> <i class="fa fa-arrow-up"></i></span>
        <div id="history" class="collapse">
          <div class="box-shadow collapse-history-wrapper">
           <p class="collapse-wrapper-intro-p">Around 2015 my interest in web tech became stronger and therefore decided to take my first coding lessions in HTML & Javascript on  <a class="w3c-link" href="https://www.w3schools.com/">w3schools website</a> and ever since I produced the famous <strong>"Hello World"</strong> to the console of my first application I knew I have found a new hobby.</p>
            <p class="collapse-wrapper-intro-p">What started as hobby and a simple <strong>"Hello World"</strong> application has become a full blown passion of mine as years gone by and has offered me opportunity to constantly learn and further develope my skills in solving complex logic behind creating web applications.</p> 
          </div>
        </div><!-- end project-collapse-wrapper -->
        </div><!-- end collapse  --> 
       </div> <!-- end col-md-12 div -->
    </div> <!-- end row div -->
  </div> <!-- end container div -->
  </section>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
      <h5 class="pt-3 about-h5-intro" data-toggle="collapse" data-target="#experience">Experience/Projects </h5><span class="about-arrow-down"> <i class="fa fa-arrow-down"></i></span>
        <span class="about-arrow-up"> <i class="fa fa-arrow-up"></i></span>
        </div> <!-- end col-md-12 div --> 
     </div> <!-- end row div -->
     <div id="experience" class="collapse">
     <p>Below are a few projects I have completed over the course of learning to code.</p>
          <div class="project-collapse-wrapper">
         
          <div class="row">
           <div class="col-md-6">
               <div class="box-shadow project-detail">
                <img src="{{ asset('imgs/ishop.jpg') }}" class="project-img" alt="Ishop"/>
                <p>Through out my coding journey, I've always wanted to build ecommerce application from the ground up to challenge myself. 
                   Ishop is a personal ecommerce project packed with lots of features which took about a 3 months to complete and I enjoyed every challenge that came with it.<br/>
                  <strong>Key features:</strong><br/>
                  <span class="tech-stack-name">Responsive . </span>
                  <span class="tech-stack-name"> User Registration & Authentication . </span>
                  <span class="tech-stack-name"> Admin Product CRUD . </span>
                  <span class="tech-stack-name"> User Order History . </span>
                  <span class="tech-stack-name">Stripe Payment . </span>
                  <span class="tech-stack-name"> Dynamic product search result page with custom product attributes</span>
                 
                  <br/>
                  <strong>Main tech stack:</strong><br/>
                <span class="tech-stack-name">React Js . </span>

                <span class="tech-stack-name">Bootstrap . </span>
                <span class="tech-stack-name">Node js . </span>
                <span class="tech-stack-name">MongoDb .  </span>
                <span class="tech-stack-name">Javascript .</span>
                <span class="tech-stack-name">scss </span>
                </p>
                <div class="source-link-wrapper">
                  <a href="https://icblog-ishop.herokuapp.com" target="_blank"><strong>Site link  </strong></a> .
                  
                  <a href="https://github.com/icblog/ishop" target="_blank"><strong>Source code</strong></a> .
                  <a href="https://github.com/icblog/ishop-api" target="_blank"><strong>Source code Api</strong></a>
                </div>
              </div>
             </div>
          
            <div class="col-md-6">
              <div class="box-shadow project-detail">
                <img src="{{ asset('imgs/adom.jpg') }}" class="project-img" alt="Adom Ballons"/>
                <p>Responsive event decoration portfolio website for a client to showcase their work.<br/>
                <strong>Key features:</strong><br/>
                  <span class="tech-stack-name">Responsive . </span>
                  <span class="tech-stack-name"> User Registration & Authentication . </span>
                  <span class="tech-stack-name"> Admin CRUD . </span>
                  <span class="tech-stack-name"> Star Rating system</span>
                 
                  
                 
                  <br/>
                
                <strong>Main tech stack:</strong><br/>
                <span class="tech-stack-name">React Js .</span>
                <span class="tech-stack-name">Bootstrap .</span>
                <span class="tech-stack-name">Node js .</span>
                <span class="tech-stack-name">MongoDb . </span>
                <span class="tech-stack-name">Javascript .</span>
                <span class="tech-stack-name">scss </span>
                </p>
                <div class="source-link-wrapper">
                  <a href="https://adom-balloons.herokuapp.com" target="_blank"><strong>Site link  </strong></a> .
                  <a href="https://github.com/icblog/Adom" target="_blank"><strong>Source code</strong></a> .
                  <a href="https://github.com/icblog/Adom-api" target="_blank"><strong>Source code Api</strong></a>
                </div>

                <span><strong>Laravel version:</strong></span><br/>
                <div class="source-link-wrapper">
                <a href="https://github.com/icblog/Adom-laravel" target="_blank"><strong>Source code</strong></a>
                </div>
              </div>
             </div>
         </div><!-- end row-->

         <div class="row">
           <div class="col-md-6">
               <div class="box-shadow project-detail">
                <img src="{{ asset('imgs/icblog.png') }}" class="project-img" alt="Ishop"/>
                <p>This is my portfolio site which you're browsing, I showcase my skills and talent here with
                  blog section coming soon to help give back to the onilne web community that has been a huge part of my coding journey.</p>
                  <strong>Key features:</strong><br/>
                  <span class="tech-stack-name">Responsive . </span>
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
                </p>
              
              </div>
             </div>
          
          
         </div><!-- end row-->
         </div><!-- end project-collapse-wrapper -->
        </div><!-- end collapse  -->   
</div> <!-- end Container div -->
</section>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h5 class="pt-3 about-h5-intro" data-toggle="collapse" data-target="#skills">Skills </h5><span class="about-arrow-down"> <i class="fa fa-arrow-down"></i></span>
        <span class="about-arrow-up"> <i class="fa fa-arrow-up"></i></span>
        </div> <!-- end col-md-12 div --> 
     </div> <!-- end row div -->
     <div id="skills" class="collapse">
     <p>I'm constantly learning new stack to add onto my skills however, below are what I'm currently familiar with.</p>
          <div class="project-collapse-wrapper">
          
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
                <p class="skills-heading-p">FrameWorks</p>
                <span>React/Redux</span> .
                  <span>Bootstrap</span> .
                  <span>Jquery/Ajax</span> .
                  <span>Laravel/Blade</span> .
                   <span>Ejs</span> .
                   <span>Jsx</span>
               </div>
             </div>
           </div><!-- end row div -->

            <div class="row"> 
              <div class="col-md-6">
              <div class="box-shadow skill-detail project-detail">
                <p class="skills-heading-p">Database & Drivers</p>
                  <span>Mysql/PhpMyAdmin</span> .
                  <span>MongoDB/Mongoose</span>
                  <span>Express</span>
                  
               </div>
             </div>

             <div class="col-md-6">
              <div class="box-shadow skill-detail project-detail">
                <p class="skills-heading-p">Tools & Systems</p>
                <span>Npm</span> .
                <span>Node Js</span> .
                <span>Composer</span> .
                  <span>Git/Github</span> .
                  <span>VS code</span>
               </div>
             </div>
             
             </div><!-- end row div -->
          </div><!-- end project-collapse-wrapper -->
        </div><!-- end collapse  --> 
        <div class="pt-4 row">
         <div class="pt-5 pb-4 text-center col-md-12">
            <a href="{{env('CV_DOWNLOAD_LINK')}}" class="primary-btn" target="_blank">Download Resume</a> 
        </div><!-- end col-md-12 div -->
       </div><!-- end row div -->
</div> <!-- end Container div -->
</section>

@endsection
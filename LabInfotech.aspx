.<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LabInfotech.aspx.cs" Inherits="LabMS.LabInfotech" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <!--====== Title ======-->
    <title>Lab Infotech</title>
    
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!--====== Favicon Icon ======-->
    <link rel="shortcut icon" href="<%= ResolveClientUrl("~/Admin/img/sky.ico") %>" type="image/png" />
        
    <!--====== Animate CSS ======-->
    <link rel="stylesheet" href="<%= ResolveClientUrl("~/websiteDesign/assets/css/animate.css") %>" />
        
    <!--====== Magnific Popup CSS ======-->
    <link rel="stylesheet" href="<%= ResolveClientUrl("~/websiteDesign/assets/css/magnific-popup.css") %>" />
        
    <!--====== Slick CSS ======-->
    <link rel="stylesheet" href="<%= ResolveClientUrl("~/websiteDesign/assets/css/slick.css") %>" />
        
    <!--====== Line Icons CSS ======-->
    <link rel="stylesheet" href="<%= ResolveClientUrl("~/websiteDesign/assets/css/LineIcons.css") %>" />
        
    <!--====== Font Awesome CSS ======-->
    <link rel="stylesheet" href="<%= ResolveClientUrl("~/websiteDesign/assets/css/font-awesome.min.css") %>" />
        
    <!--====== Bootstrap CSS ======-->
    <link rel="stylesheet" href="<%= ResolveClientUrl("~/websiteDesign/assets/css/bootstrap.min.css") %>" />
    
    <!--====== Default CSS ======-->
    <link rel="stylesheet" href="<%= ResolveClientUrl("~/websiteDesign/assets/css/default.css") %>" />
    
    <!--====== Style CSS ======-->
    <link rel="stylesheet" href="<%= ResolveClientUrl("~/websiteDesign/assets/css/style.css") %>" />
</head>
<body>
    <form id="form1" runat="server">
    <!--====== PRELOADER PART START ======-->

<%--    <div class="preloader">
        <div class="loader">
            <div class="ytp-spinner">
                <div class="ytp-spinner-container">
                    <div class="ytp-spinner-rotator">
                        <div class="ytp-spinner-left">
                            <div class="ytp-spinner-circle"></div>
                        </div>
                        <div class="ytp-spinner-right">
                            <div class="ytp-spinner-circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>

    <!--====== PRELOADER PART ENDS ======-->
    
    <!--====== HEADER PART START ======-->
    
    <header class="header-area">
        <div class="navbar-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <nav class="navbar navbar-expand-lg">
                            <a class="navbar-brand" href="LabInfotech.aspx">
                                <img src="<%= ResolveClientUrl("~/Admin/img/sky.ico") %>" alt="Logo" style="height:50%;width:50%">
                            </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                <ul id="nav" class="navbar-nav ml-auto">
                                    <li class="nav-item active">
                                        <a class="page-scroll" href="#home">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="#features">Features</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="#about">About</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="#facts">Why</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="#team">Team</a>
                                    </li>
                                  <%--  <li class="nav-item">
                                        <a class="page-scroll" href="#blog">Blog</a>
                                    </li>--%>
                                </ul>
                            </div> <!-- navbar collapse -->
                            
                            <div class="navbar-btn d-none d-sm-inline-block">
                                <a class="main-btn" data-scroll-nav="0" href="Default.aspx">Go To Software</a>
                            </div>
                            <%-- <div class="navbar-btn d-none d-sm-inline-block">
                                <a class="main-btn" data-scroll-nav="0" href="#pricing">Patient Login</a>
                            </div>--%>
                        </nav> <!-- navbar -->
                    </div>
                </div> <!-- row -->
            </div> <!-- container -->
        </div> <!-- navbar area -->
        
        <div id="home" class="header-hero bg_cover" style="background-image: url(websiteDesign/assets/images/banner-bg.svg)">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="header-hero-content text-center">
                            <h3 class="header-sub-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">Lab Infotech</h3>
                            <h2 class="header-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.5s">Laboratory information management system</h2>
                            <p class="text wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.8s">A laboratory information management system, sometimes referred to as a laboratory information system or laboratory management system, is a software-based solution with features that support a modern laboratory's operations</p>
                       <%--     <a href="#" class="main-btn wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="1.1s">Get Started</a>
                      --%>  </div> <!-- header hero content -->
                    </div>
                </div> <!-- row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="header-hero-image text-center wow fadeIn" data-wow-duration="1.3s" data-wow-delay="1.4s">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/header-hero.png") %>" alt="hero">
                        </div> <!-- header hero image -->
                    </div>
                </div> <!-- row -->
            </div> <!-- container -->
            <div id="particles-1" class="particles"></div>
        </div> <!-- header hero -->
    </header>
    
    <!--====== HEADER PART ENDS ======-->
    
    <!--====== BRAMD PART START ======-->
    
<%--    <div class="brand-area pt-90">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="brand-logo d-flex align-items-center justify-content-center justify-content-md-between">
                        <div class="single-logo mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/brand-1.png") %>" alt="brand">
                        </div> <!-- single logo -->
                        <div class="single-logo mt-30 wow fadeIn" data-wow-duration="1.5s" data-wow-delay="0.2s">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/brand-2.png") %>" alt="brand">
                        </div> <!-- single logo -->
                        <div class="single-logo mt-30 wow fadeIn" data-wow-duration="1.5s" data-wow-delay="0.3s">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/brand-3.png") %>" alt="brand">
                        </div> <!-- single logo -->
                        <div class="single-logo mt-30 wow fadeIn" data-wow-duration="1.5s" data-wow-delay="0.4s">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/brand-4.png") %>" alt="brand">
                        </div> <!-- single logo -->
                        <div class="single-logo mt-30 wow fadeIn" data-wow-duration="1.5s" data-wow-delay="0.5s">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/brand-5.png") %>" alt="brand">
                        </div> <!-- single logo -->
                    </div> <!-- brand logo -->
                </div>
            </div>   <!-- row -->
        </div> <!-- container -->
    </div>
    --%>
    <!--====== BRAMD PART ENDS ======-->
    
    <!--====== SERVICES PART START ======-->
    
    <section id="features" class="services-area pt-120">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="section-title text-center pb-40">
                        <div class="line m-auto"></div>
                        <h3 class="title">Simple User Interface, <span> Comes with everything you need to Run Your Lab!</span></h3>
                    </div> <!-- section title -->
                </div>
            </div> <!-- row -->
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-7 col-sm-8">
                    <div class="single-services text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                        <div class="services-icon">
                            <img class="shape" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/services-shape.svg") %>" alt="shape">
                            <img class="shape-1" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/services-shape-1.svg") %>" alt="shape">
                            <i class="lni-baloon"></i>
                        </div>
                        <div class="services-content mt-30">
                            <h4 class="services-title"><a href="#">Simple UI</a></h4>
                            <p class="text">At the most basic level, the user interface (UI) is the series of screens, pages, and visual elements—like buttons and icons—that enable a person to interact with a product or service.</p>
                     <%--       <a class="more" href="#">Learn More <i class="lni-chevron-right"></i></a>
                     --%>   </div>
                    </div> <!-- single services -->
                </div>
                <div class="col-lg-4 col-md-7 col-sm-8">
                    <div class="single-services text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div class="services-icon">
                            <img class="shape" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/services-shape.svg") %>" alt="shape">
                            <img class="shape-1" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/services-shape-2.svg") %>" alt="shape">
                            <i class="lni-cog"></i>
                        </div>
                        <div class="services-content mt-30">
                            <h4 class="services-title"><a href="#">High Performance</a></h4>
                            <p class="text">High Performance Computing most generally refers to the practice of aggregating computing power in a way that delivers much higher performance than one could get out of a typical desktop computer or workstation in order to solve large problems in science, engineering, or business.</p>
                     <%--       <a class="more" href="#">Learn More <i class="lni-chevron-right"></i></a>
                     --%>   </div>
                    </div> <!-- single services -->
                </div>
                <div class="col-lg-4 col-md-7 col-sm-8">
                    <div class="single-services text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
                        <div class="services-icon">
                            <img class="shape" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/services-shape.svg") %>" alt="shape">
                            <img class="shape-1" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/services-shape-3.svg") %>" alt="shape">
                            <i class="lni-bolt-alt"></i>
                        </div>
                        <div class="services-content mt-30">
                            <h4 class="services-title"><a href="#">Total Security</a></h4>
                            <p class="text">Total Security comes with five. This means you can secure multiple computers or mobile devices with a single subscription. And you can control and manage settings for each device from a single user dashboard through your online portal.</p>
                 <%--           <a class="more" href="#">Learn More <i class="lni-chevron-right"></i></a>
                 --%>       </div>
                    </div> <!-- single services -->
                </div>
            </div> <!-- row -->
        </div> <!-- container -->
    </section>
    
    <!--====== SERVICES PART ENDS ======-->
    
    <!--====== ABOUT PART START ======-->
    
    <section id="about" class="about-area pt-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="about-content mt-50 wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div class="section-title">
                            <div class="line"></div>
                            <h3 class="title">Quick & Easy <span>to Use Lab Infotech Software</span></h3>
                        </div> <!-- section title -->
                        <p class="text">User-friendly describes a hardware device or software interface that is easy to use. It is "friendly" to the user, meaning it is not difficult to learn or understand.</p>
                  <%--      <a href="#" class="main-btn">Try it Free</a>--%>
                    </div> <!-- about content -->
                </div>
                <div class="col-lg-6">
                    <div class="about-image text-center mt-50 wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/about1.svg") %>" alt="about">
                    </div> <!-- about image -->
                </div>
            </div> <!-- row -->
        </div> <!-- container -->
        <div class="about-shape-1">
            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/about-shape-1.svg") %>" alt="shape">
        </div>
    </section>
    
    <!--====== ABOUT PART ENDS ======-->
    
    <!--====== ABOUT PART START ======-->
    
    <section class="about-area pt-70">
        <div class="about-shape-2">
            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/about-shape-2.svg") %>" alt="shape">
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 order-lg-last">
                    <div class="about-content mt-50 wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div class="section-title">
                            <div class="line"></div>
                            <h3 class="title">Modern design <span> with Essential Features</span></h3>
                        </div> <!-- section title -->
                        <p class="text">Software design is the process by which an agent creates a specification of a software artifact, intended to accomplish goals, using a set of primitive components and subject to constraints.</p>
                   <%--     <a href="#" class="main-btn">Try it Free</a>
                   --%> </div> <!-- about content -->
                </div>
                <div class="col-lg-6 order-lg-first">
                    <div class="about-image text-center mt-50 wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/about2.svg") %>" alt="about">
                    </div> <!-- about image -->
                </div>
            </div> <!-- row -->
        </div> <!-- container -->
    </section>


    <!--====== ABOUT PART START ======-->
    
    <section class="about-area pt-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="about-content mt-50 wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div class="section-title">
                            <div class="line"></div>
                            <h3 class="title"><span>Reporting Module </span> Fast And Easy Reporting</h3>
                        </div> <!-- section title -->
                        <p class="text">software design is performed by creating modules, it makes the task easier to maintain. Tasks like finding bugs, debugging, restructuring, and changing the functionality of specific elements in the software application become quite easy due to software design.</p>
                    <%--    <a href="#" class="main-btn">Try it Free</a>
                   --%> </div> <!-- about content -->
                </div>
                <div class="col-lg-6">
                    <div class="about-image text-center mt-50 wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/about3.svg") %>" alt="about">
                    </div> <!-- about image -->
                </div>
            </div> <!-- row -->
        </div> <!-- container -->
        <div class="about-shape-1">
            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/about-shape-1.svg") %>" alt="shape">
        </div>
    </section>
    
    <!--====== ABOUT PART ENDS ======-->

    
    <!--====== ABOUT PART ENDS ======-->
    
    <!--====== VIDEO COUNTER PART START ======-->
    
    <section id="facts" class="video-counter pt-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="video-content mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                        <img class="dots" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/dots.svg") %>" alt="dots">
                        <div class="video-wrapper">
                            <div class="video-image">
                                <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/video.png") %>" alt="video">
                            </div>
                            <div class="video-icon">
                                <a href="#" class="video-popup"><i class="lni-play"></i></a>
                            </div>
                        </div> <!-- video wrapper -->
                    </div> <!-- video content -->
                </div>
                <div class="col-lg-6">
                    <div class="counter-wrapper mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
                        <div class="counter-content">
                            <div class="section-title">
                                <div class="line"></div>
                                <h3 class="title">Cool facts <span> this about software</span></h3>
                            </div> <!-- section title -->
                            <p class="text">Simple and Easy way to use .fast Reporting and Fully Online Application Than Can be use out side the Lab For Validate Reporting.</p>
                        </div> <!-- counter content -->
                        <div class="row no-gutters">
                            <div class="col-4">
                                <div class="single-counter counter-color-1 d-flex align-items-center justify-content-center">
                                    <div class="counter-items text-center">
                                        <span class="count"><span class="counter">0</span>K</span>
                                        <p class="text">Downloads</p>
                                    </div>
                                </div> <!-- single counter -->
                            </div>
                            <div class="col-4">
                                <div class="single-counter counter-color-2 d-flex align-items-center justify-content-center">
                                    <div class="counter-items text-center">
                                        <span class="count"><span class="counter">0</span>K</span>
                                        <p class="text">Active Users</p>
                                    </div>
                                </div> <!-- single counter -->
                            </div>
                            <div class="col-4">
                                <div class="single-counter counter-color-3 d-flex align-items-center justify-content-center">
                                    <div class="counter-items text-center">
                                        <span class="count"><span class="counter">5.0</span></span>
                                        <p class="text">User Rating</p>
                                    </div>
                                </div> <!-- single counter -->
                            </div>
                        </div> <!-- row -->
                    </div> <!-- counter wrapper -->
                </div>
            </div> <!-- row -->
        </div> <!-- container -->
    </section>
    
    <!--====== VIDEO COUNTER PART ENDS ======-->
    
    <!--====== TEAM PART START ======-->
    
    <section id="team" class="team-area pt-120">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="section-title text-center pb-30">
                        <div class="line m-auto"></div>
                        <h3 class="title"><span>Meet Our</span> Creative Team Members</h3>
                    </div> <!-- section title -->
                </div>
            </div> <!-- row -->
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-7 col-sm-8">
                    <div class="single-team text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                      <%--  <div class="team-image">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/team-1.png") %>" alt="Team">
                            <div class="social">
                                <ul>
                                    <li><a href="#"><i class="lni-facebook-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-twitter-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-instagram-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-linkedin-original"></i></a></li>
                                </ul>
                            </div>
                        </div>--%>
                        <div class="team-content">
                            <h5 class="holder-name"><a href="#">Sushil Kumar Yadav</a></h5>
                            <p class="text"> Software Developer</p>
                        </div>
                    </div> <!-- single team -->
                </div>
                <div class="col-lg-4 col-md-7 col-sm-8">
                    <div class="single-team text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                      <%--  <div class="team-image">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/team-2.png") %>" alt="Team">
                            <div class="social">
                                <ul>
                                    <li><a href="#"><i class="lni-facebook-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-twitter-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-instagram-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-linkedin-original"></i></a></li>
                                </ul>
                            </div>
                        </div>--%>
                        <div class="team-content">
                            <h5 class="holder-name"><a href="#">Ritunanjay Singh</a></h5>
                            <p class="text">Marketing Executive</p>
                        </div>
                    </div> <!-- single team -->
                </div>
                <div class="col-lg-4 col-md-7 col-sm-8" style="display:none">
                    <div class="single-team text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
                        <%--<div class="team-image">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/team-3.png") %>" alt="Team">
                            <div class="social">
                                <ul>
                                    <li><a href="#"><i class="lni-facebook-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-twitter-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-instagram-filled"></i></a></li>
                                    <li><a href="#"><i class="lni-linkedin-original"></i></a></li>
                                </ul>
                            </div>
                        </div>--%>
                        <div class="team-content">
                            <h5 class="holder-name"><a href="#">Arjun Singh</a></h5>
                             <p class="text">Sr. Software Engineer</p>
                       </div>
                    </div> <!-- single team -->
                </div>
            </div> <!-- row -->
        </div> <!-- container -->
    </section>
    
    <!--====== TEAM PART ENDS ======-->
    
    <!--====== TESTIMONIAL PART START ======-->
    
    <section id="testimonial" class="testimonial-area pt-120">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="section-title text-center pb-40">
                        <div class="line m-auto"></div>
                        <h3 class="title">Users sharing<span> their experience</span></h3>
                    </div> <!-- section title -->
                </div>
            </div> <!-- row -->
            <div class="row testimonial-active wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.8s">
                <div class="col-lg-4">
                    <div class="single-testimonial">
                        <div class="testimonial-review d-flex align-items-center justify-content-between">
                            <div class="quota">
                                <i class="lni-quotation"></i>
                            </div>
                            <div class="star">
                                <ul>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div class="testimonial-text">
                            <p class="text">No Comment.</p>
                        </div>
                      <%--  <div class="testimonial-author d-flex align-items-center">
                            <div class="author-image">
                                <img class="shape" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/textimonial-shape.svg") %>" alt="shape">
                                <img class="author" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/author-1.png") %>" alt="author">
                            </div>
                            <div class="author-content media-body">
                                <h6 class="holder-name">Jenny Deo</h6>
                                <p class="text">CEO, SpaceX</p>
                            </div>
                        </div>--%>
                    </div> <!-- single testimonial -->
                </div>
                <div class="col-lg-4">
                    <div class="single-testimonial">
                        <div class="testimonial-review d-flex align-items-center justify-content-between">
                            <div class="quota">
                                <i class="lni-quotation"></i>
                            </div>
                            <div class="star">
                                <ul>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div class="testimonial-text">
                            <p class="text">No Comment.</p>
                        </div>
                        <%--<div class="testimonial-author d-flex align-items-center">
                            <div class="author-image">
                                <img class="shape" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/textimonial-shape.svg") %>" alt="shape">
                                <img class="author" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/author-2.png") %>" alt="author">
                            </div>
                            <div class="author-content media-body">
                                <h6 class="holder-name">Marjin Otte</h6>
                                <p class="text">UX Specialist, Yoast</p>
                            </div>
                        </div>--%>
                    </div> <!-- single testimonial -->
                </div>
                <div class="col-lg-4">
                    <div class="single-testimonial">
                        <div class="testimonial-review d-flex align-items-center justify-content-between">
                            <div class="quota">
                                <i class="lni-quotation"></i>
                            </div>
                            <div class="star">
                                <ul>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                    <li><i class="lni-star-filled"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div class="testimonial-text">
                            <p class="text">No Comment.</p>
                        </div>
                        <%--<div class="testimonial-author d-flex align-items-center">
                            <div class="author-image">
                                <img class="shape" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/textimonial-shape.svg") %>" alt="shape">
                                <img class="author" src="<%= ResolveClientUrl("~/websiteDesign/assets/images/author-3.png") %>" alt="author">
                            </div>
                            <div class="author-content media-body">
                                <h6 class="holder-name">David Smith</h6>
                                <p class="text">CTO, Alphabet</p>
                            </div>
                        </div>--%>
                    </div> <!-- single testimonial -->
                </div>
             </div> <!-- row -->
        </div> <!-- container -->
    </section>
    
    <!--====== TESTIMONIAL PART ENDS ======-->
    
    <!--====== BLOG PART START ======-->
   <%-- 
    <section id="blog" class="blog-area pt-120">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="section-title pb-35">
                        <div class="line"></div>
                        <h3 class="title"><span>Our Recent</span> Blog Posts</h3>
                    </div> <!-- section title -->
                </div>
            </div> <!-- row -->
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-7">
                    <div class="single-blog mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                        <div class="blog-image">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/blog-1.jpg") %>" alt="blog">
                        </div>
                        <div class="blog-content">
                            <ul class="meta">
                                <li>Posted By: <a href="#">Admin</a></li>
                                <li>03 June, 2023</li>
                            </ul>
                            <p class="text">Lorem ipsuamet conset sadips cing elitr seddiam nonu eirmod tempor invidunt labore.</p>
                            <a class="more" href="#">Learn More <i class="lni-chevron-right"></i></a>
                        </div>
                    </div> <!-- single blog -->
                </div> 
                <div class="col-lg-4 col-md-7">
                    <div class="single-blog mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div class="blog-image">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/blog-2.jpg") %>" alt="blog">
                        </div>
                        <div class="blog-content">
                            <ul class="meta">
                                <li>Posted By: <a href="#">Admin</a></li>
                                <li>03 June, 2023</li>
                            </ul>
                            <p class="text">Lorem ipsuamet conset sadips cing elitr seddiam nonu eirmod tempor invidunt labore.</p>
                            <a class="more" href="#">Learn More <i class="lni-chevron-right"></i></a>
                        </div>
                    </div> <!-- single blog -->
                </div> 
                <div class="col-lg-4 col-md-7">
                    <div class="single-blog mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
                        <div class="blog-image">
                            <img src="<%= ResolveClientUrl("~/websiteDesign/assets/images/blog-3.jpg") %>" alt="blog">
                        </div>
                        <div class="blog-content">
                            <ul class="meta">
                                <li>Posted By: <a href="#">Admin</a></li>
                                <li>03 June, 2023</li>
                            </ul>
                            <p class="text">Lorem ipsuamet conset sadips cing elitr seddiam nonu eirmod tempor invidunt labore.</p>
                            <a class="more" href="#">Learn More <i class="lni-chevron-right"></i></a>
                        </div>
                    </div> <!-- single blog -->
                </div> 
            </div> <!-- row -->
        </div> <!-- container -->
    </section>
    
    --%><!--====== BLOG PART ENDS ======-->
    
    <!--====== FOOTER PART START ======-->
    
    <footer id="footer" class="footer-area pt-120">
        <div class="container">
            <div class="subscribe-area wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="subscribe-content mt-45">
                            <h2 class="subscribe-title">Subscribe Our Newsletter <span>get reguler updates</span></h2>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="subscribe-form mt-50">
                            <div >
                                <input type="text" placeholder="Enter EmailID" />
                                <button class="main-btn">Subscribe</button>
                            </div>
                        </div>
                    </div>
                 </div> <!-- row -->
            </div> <!-- subscribe area -->
            <div class="footer-widget pb-100">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8">
                        <div class="footer-about mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                            <a class="logo" href="#">
                                <img src="<%= ResolveClientUrl("~/Admin/img/sky.ico") %>" alt="logo" style="height:50%;width:50%">
                            </a>
                            <p class="text">A laboratory information management system, sometimes referred to as a laboratory information system or laboratory management system, is a software-based solution with features that support a modern laboratory's operations.</p>
                            <ul class="social">
                                <li><a href="#"><i class="lni-facebook-filled"></i></a></li>
                                <li><a href="#"><i class="lni-twitter-filled"></i></a></li>
                                <li><a href="#"><i class="lni-instagram-filled"></i></a></li>
                                <li><a href="#"><i class="lni-linkedin-original"></i></a></li>
                            </ul>
                        </div> <!-- footer about -->
                    </div>
                   
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="footer-contact mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
                            <div class="footer-title">
                                <h4 class="title">Contact Us</h4>
                            </div>
                            <ul class="contact">
                                <li>+91 9719091747</li>
                                <li>labinfotech2020@gmail.com</li>
                                <li>www.labinfotech.com</li>
                                <li>Address Not Found<br> </li>
                            </ul>
                        </div> <!-- footer contact -->
                    </div>
                </div> <!-- row -->
            </div> <!-- footer widget -->
            <div class="footer-copyright">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="copyright d-sm-flex justify-content-between">
                            <div class="copyright-content">
                                <p class="text">Designed and Developed by <a href="#" rel="nofollow">Labinfotech</a></p>
                            </div> <!-- copyright content -->
                        </div> <!-- copyright -->
                    </div>
                </div> <!-- row -->
            </div> <!-- footer copyright -->
        </div> <!-- container -->
        <div id="particles-2"></div>
    </footer>
    
    <!--====== FOOTER PART ENDS ======-->
    
    <!--====== BACK TOP TOP PART START ======-->

    <a href="#" class="back-to-top"><i class="lni-chevron-up"></i></a>

    <!--====== BACK TOP TOP PART ENDS ======-->   
    
    <!--====== PART START ======-->
    
<!--
    <section class="">
        <div class="container">
            <div class="row">
                <div class="col-lg-"></div>
            </div>
        </div>
    </section>
-->
    
    <!--====== PART ENDS ======-->




    <!--====== Jquery js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/vendor/jquery-1.12.4.min.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/vendor/modernizr-3.7.1.min.js") %>"></script>
    
    <!--====== Bootstrap js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/popper.min.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/bootstrap.min.js") %>"></script>
    
    <!--====== Plugins js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/plugins.js") %>"></script>
    
    <!--====== Slick js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/slick.min.js") %>"></script>
    
    <!--====== Ajax Contact js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/ajax-contact.js") %>"></script>
    
    <!--====== Counter Up js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/waypoints.min.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/jquery.counterup.min.js") %>"></script>
    
    <!--====== Magnific Popup js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/jquery.magnific-popup.min.js") %>"></script>
    
    <!--====== Scrolling Nav js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/jquery.easing.min.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/scrolling-nav.js") %>"></script>
    
    <!--====== wow js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/wow.min.js") %>"></script>
    
    <!--====== Particles js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/particles.min.js") %>"></script>
    
    <!--====== Main js ======-->
    <script src="<%= ResolveClientUrl("~/websiteDesign/assets/js/main.js") %>"></script>
    
    </form>
</body>
</html>

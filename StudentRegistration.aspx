<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StudentRegistration.aspx.cs" Inherits="LabMS.StudentRegistration" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <title>Lab Infotech</title>
    <link rel="shortcut icon" href="admin/img/sky.ico" />   <!-- vector map CSS -->
    <link href="<%= ResolveClientUrl("~/admin/vendors/bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css") %>" rel="stylesheet" type="text/css" />
    <!-- Custom CSS -->
    <link href="<%= ResolveClientUrl("~/admin/dist/css/style.css") %>" rel="stylesheet" type="text/css">
    <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/jquery/dist/jquery.min.js") %>"></script>
    <link href="<%= ResolveClientUrl("~/Admin/dist/js/jquery-ui.css") %>" rel="stylesheet" />
    <script src="<%= ResolveClientUrl("~/Admin/dist/js/jquery-ui.min.js") %>"></script>
    <!-- Custom CSS -->

    <style>
        .fullscreen-bg {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            overflow: hidden;
            z-index: -100;
        }

        .fullscreen-bg__video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        @media (min-aspect-ratio: 16/9) {
            .fullscreen-bg__video {
                height: 300%;
                top: -100%;
            }
        }

        @media (max-aspect-ratio: 16/9) {
            .fullscreen-bg__video {
                width: 300%;
                left: -100%;
            }
        }

        @media (max-width: 100%) {
            .fullscreen-bg {
                background: url('img/report_h_bg.png') center center / cover no-repeat;
            }

            .fullscreen-bg__video {
                display: inline;
            }
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="fullscreen-bg">
            <video loop muted autoplay poster="Admin/img/wallpaper.png" class="fullscreen-bg__video">

                 <source src="video/lab.mp4" type="video/mp4" />
            </video>
            <div class="wrapper pa-0">
                <header class="sp-header">
                    <div class="sp-logo-wrap" style="text-align: center;">
                        <img class="brand-img" runat="server" id="logo" src="#" alt="Easy Labtech : Complete Labortary Management Solution" style="height: 220px" />
                    </div>
                    <div class="clearfix"></div>
                </header>

                <!-- Main Content -->
                <div class="page-wrapper pa-0 ma-0 auth-page">
                    <div class="container-fluid">
                        <!-- Row -->
                        <div class="table-struct full-width full-height">
                            <div class="table-cell vertical-align-middle auth-form-wrap">
                                <div class="auth-form  ml-auto mr-auto no-float">
                                    <div class="row">
                                        <div class="col-sm-12 col-xs-12">
                                            <div class="mb-10">
                                                <h3 class="text-center" style="font-size: 22px; color: #f2e8e8; font-weight: 800; text-shadow: 1px 2px 0px #000, 1px 4px 0px rgba(0,0,0,0.15);">
                                                    <asp:Label ID="lblcompany" runat="server" Text=""></asp:Label></h3>
                                                <h3 class="text-center" style="font-size: 20px; color: #f2e8e8; font-weight: 800; text-shadow: 1px 2px 0px #000, 1px 4px 0px rgba(0,0,0,0.15);">
                                                    <asp:Label ID="lblworking" runat="server" Text=""></asp:Label></h3>
                                                <h6 class="text-center nonecase-font" style="color: white">OnlineExam  Management System (OMS)</h6>
                                            </div>
                                            <div class="form-wrap">
                                                <div class="form-group text-center">
                                                    <asp:Button ID="btnstudentregistration" runat="server" Text="Registration Student" class="btn btn-success btn-rounded" OnClick="btnstudentregistration_Click" />
                                                    <asp:Button ID="btnstudentlogin" runat="server" Text="Student Login" class="btn btn-danger btn-rounded" OnClick="btnstudentlogin_Click" />
                                                </div>
                                                <asp:Panel ID="errorpanel" runat="server" Visible="false">
                                                    <div class="alert alert-danger alert-dismissable">
                                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                        <asp:Label ID="lblerrormsg" runat="server" Text=""></asp:Label>
                                                    </div>

                                                </asp:Panel> <asp:Panel ID="successpanel" runat="server" Visible="false">
                                                    <div class="alert alert-success alert-dismissable">
                                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                        <asp:Label ID="lblsuccess" runat="server" Text=""></asp:Label>
                                                    </div>

                                                </asp:Panel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /Row -->
                    </div>

                </div>
                <!-- /Main Content -->
                <!-- Footer -->
                <footer class="footer container-fluid pl-30 pr-30" style="/* position: fixed; *//* bottom: 26px; */font-weight: 800; height: 40px; color: #f6faf2; margin-top: 0 !important; margin-bottom: 0 !important; text-align: center; font-size: 32px; margin-right: 0px !important; /* padding: 10px; */width: calc(100vw - 0px); box-shadow: 0 -2px 2px 0 rgb(173, 218, 240); z-index: 20;">
                    <div class="row">
                        <p style="line-height: 15px; font-size: 8px; color: #f2e8e8"><span id="linklabel" runat="server"></span></p>
                    </div>
                </footer>
                <!-- /Footer -->
            </div>
            <!-- /#wrapper -->
        </div>
        <!-- JavaScript -->

        <!-- jQuery -->
        <script src="<%= ResolveClientUrl("~/admin/vendors/bower_components/jquery/dist/jquery.min.js") %>"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="<%= ResolveClientUrl("~/admin/vendors/bower_components/bootstrap/dist/js/bootstrap.min.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/admin/vendors/bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js") %>"></script>

        <!-- Slimscroll JavaScript -->
        <script src="<%= ResolveClientUrl("~/admin/dist/js/jquery.slimscroll.js") %>"></script>
        <!-- Init JavaScript -->
        <script src="<%= ResolveClientUrl("~/admin/dist/js/init.js") %>"></script>

    </form>
</body>
</html>

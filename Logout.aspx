<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Logout.aspx.cs" Inherits="ITHospital.Logout" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Lab Infotech</title>
    <link rel="shortcut icon" href="<%= ResolveClientUrl("~/Admin/img/sky.ico") %>" />
    <link href="admin/vendors/bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="admin/dist/css/style.css" rel="stylesheet" type="text/css" />
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

        @media (max-width: 767px) {
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
                        <a href="Alogin.aspx">
                            <img class="brand-img" runat="server" id="logo" src="#" alt="Lab Infotech" style="height: 220px" />
                        </a>
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
                                            <div class="mb-30">
                                                <h3 class="text-center mb-10" style="color: #fff">Sign out in Lab Infotech</h3>
                                            </div>
                                            <div class="form-wrap">
                                                <div>

                                                    <div class="form-group col-md-12">
                                                        <div class="checkbox checkbox-primary pr-10 pull-left">
                                                            <asp:CheckBox ID="chkRembme" runat="server" Text="Remove Remember me" ForeColor="White"></asp:CheckBox>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group text-center">
                                                        <asp:Button ID="btnGoto" runat="server" class="btn btn-red" Style="width: 50%; font-weight: 900; background: #56ab2f; background: -webkit-linear-gradient(to bottom, #a8e063, #56ab2f); background: linear-gradient(to bottom, #a8e063, #56ab2f);"
                                                            Text="Go to LMS Login" OnClick="btnGoto_OnClick"></asp:Button>
                                                    </div>
                                                </div>
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
            </div>
        </div>
        <script src="admin/vendors/bower_components/jquery/dist/jquery.min.js"></script>
        <script src="admin/vendors/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="admin/vendors/bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js"></script>
        <script src="admin/dist/js/jquery.slimscroll.js"></script>
        <script src="admin/dist/js/init.js"></script>
    </form>
</body>
</html>

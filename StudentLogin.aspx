<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StudentLogin.aspx.cs" Inherits="LabMS.StudentLogin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
      <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
       <title>Lab Infotech</title>
    <link rel="shortcut icon" href="admin/img/sky.ico" /> <!-- vector map CSS -->
    <link href="admin/vendors/bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Custom CSS -->
    <link href="admin/dist/css/style.css" rel="stylesheet" type="text/css">
    <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/jquery/dist/jquery.min.js") %>"></script>
    <link href="<%= ResolveClientUrl("~/Admin/dist/js/jquery-ui.css") %>" rel="stylesheet" />
    <script src="<%= ResolveClientUrl("~/Admin/dist/js/jquery-ui.min.js") %>"></script>

    <link href="<%=ResolveClientUrl("~/Project_js/alertify.css")%>" rel="stylesheet" type="text/css" />
    <script src="<%=ResolveClientUrl("~/Project_js/alertify.js")%>"></script>
    <script src="<%= ResolveClientUrl("~/Admin/BiomatiricJS/mfs100-9.0.2.6.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/Admin/BiomatiricJS/scanssavefingureprint.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/Admin/BiomatiricJS/scanfingureuserlogin.js") %>"></script>
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
                     <img class="brand-img" runat="server" id="logo" src="#" alt="Easy Labtech : Complete Labortary Management Solution" style="height:120px" />
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

                                            <asp:HiddenField ID="txtisoimage" runat="server" ClientIDMode="Static" />
                                            <asp:HiddenField ID="finguredetail" runat="server" ClientIDMode="Static" />
                                            <asp:HiddenField ID="lbldeviceinfo" runat="server" ClientIDMode="Static" />
                                            <asp:HiddenField ID="logincount" runat="server" ClientIDMode="Static" />
                                            <asp:HiddenField ID="fingureuser" runat="server" ClientIDMode="Static" />
                                            <img id="imgfingure" src="#" clientidmode="Static" style="display: none" />
                                            <h3 class="text-center" style="font-size: 22px; color: #f2e8e8; font-weight: 800; text-shadow: 1px 2px 0px #000, 1px 4px 0px rgba(0,0,0,0.15);">
                                                <asp:Label ID="lblcompany" runat="server" Text="Company"></asp:Label></h3>
                                            <h3 class="text-center" style="font-size: 20px; color: #f2e8e8; font-weight: 800; text-shadow: 1px 2px 0px #000, 1px 4px 0px rgba(0,0,0,0.15);">
                                                <asp:Label ID="lblworking" runat="server" Text="Working"></asp:Label></h3>
                                            <h6 class="text-center nonecase-font" style="color: white;">OnlineExam Management System (OMS)</h6>
                                            <h3 class="text-center mb-10" style="font-size: 20px; color: #f2e8e8; font-weight: 800; text-shadow: 1px 2px 0px #000, 1px 4px 0px rgba(0,0,0,0.15);">Student Login</h3>
                                        </div>
                                        <div class="form-wrap">
                                            <div>
                                                <div class="form-group col-sm-6 col-md-6">
                                                    <label class="control-label mb-10" for="exampleInputEmail_2" style="color:white">User Name</label>
                                                    <asp:TextBox ID="txtuserid" CssClass="form-control" autocomplete="off" runat="server" placeholder="User Name"
                                                        required></asp:TextBox>
                                                </div>
                                                <div class="form-group col-sm-6 col-md-6">
                                                    <label class="pull-left control-label mb-10" for="exampleInputpwd_2" style="color:white">Password</label>
                                                    <div class="clearfix"></div>
                                                    <asp:TextBox ID="txtpass" CssClass="form-control" autocomplete="off" runat="server" placeholder="Password"
                                                        TextMode="Password" required></asp:TextBox>
                                                </div>

                                                <div class="form-group col-md-12">
                                                    <div class="checkbox checkbox-primary pr-10 pull-left">
                                                        <asp:CheckBox ID="chkRembme" runat="server" Text="Remember me" ForeColor="White"></asp:CheckBox>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="form-group text-center">
                                                    <asp:Button ID="Btnlogin" class="btn btn-success btn-rounded" runat="server" Text="Sign In" OnClick="Btnlogin_Click" />
                                                    <input type="button" id="btnfingureprintlogin" class="btn btn-success btn-rounded" value="Scan Fingure" style="display:none" />
                                                 <a href="StudentRegistration.aspx" class="btn  btn-warning btn-rounded">Go To Registration</a>
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
                <!-- Footer -->
             <footer class="footer container-fluid pl-30 pr-30" style="/* position: fixed; *//* bottom: 26px; */font-weight: 800;height: 40px;color: #f6faf2;margin-top: 0 !important;margin-bottom: 0 !important;text-align: center;font-size: 32px;margin-right: 0px !important;/* padding: 10px; */width: calc(100vw - 0px);box-shadow: 0 -2px 2px 0 rgb(173, 218, 240);z-index: 20;">
                    <div class="row">
                            <p style="line-height: 15px; font-size: 8px; color:#f2e8e8"><span id="linklabel" runat="server"></span></p>
                      </div>
                </footer>
                <!-- /Footer -->
            </div>
            <!-- /#wrapper -->
</div>
            <!-- JavaScript -->

            <!-- jQuery -->
            <script src="admin/vendors/bower_components/jquery/dist/jquery.min.js"></script>

            <!-- Bootstrap Core JavaScript -->
            <script src="admin/vendors/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
            <script src="admin/vendors/bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js"></script>

            <!-- Slimscroll JavaScript -->
            <script src="admin/dist/js/jquery.slimscroll.js"></script>
            <!-- Init JavaScript -->
            <script src="admin/dist/js/init.js"></script>
    </form>
</body>
</html>

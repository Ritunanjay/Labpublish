<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RadiologyReporting.aspx.cs" Inherits="LabMS.Navigation.RadiologyWorking.RadiologyReporting" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="shortcut icon" href="<%= ResolveClientUrl("~/Admin/img/logo.ico") %>" />
    <title>LMS:IT Solution</title>

    <!-- Bootstrap Colorpicker CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/mjolnic-bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css") %>" rel="stylesheet" type="text/css" />

    <!-- select2 CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/select2/dist/css/select2.min.css") %>" rel="stylesheet" type="text/css" />

    <!-- switchery CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/switchery/dist/switchery.min.css") %>" rel="stylesheet" type="text/css" />

    <!-- bootstrap-select CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/bootstrap-select/dist/css/bootstrap-select.min.css") %>" rel="stylesheet" type="text/css" />

    <!-- bootstrap-tagsinput CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.css") %>" rel="stylesheet" type="text/css" />

    <!-- bootstrap-touchspin CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css") %>" rel="stylesheet" type="text/css" />
    <!-- Data table CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/datatables/media/css/jquery.dataTables.min.css") %>" rel="stylesheet" type="text/css" />

    <!-- multi-select CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/multiselect/css/multi-select.css") %>" rel="stylesheet" type="text/css" />

    <!-- Bootstrap Switches CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= ResolveClientUrl("~/admin/vendors/bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css")%>" rel="stylesheet" type="text/css" />

    <!-- Bootstrap Datetimepicker CSS -->
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css")%>" rel="stylesheet" />
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= ResolveClientUrl("~/Admin/dist/css/style.css") %>" rel="stylesheet" type="text/css">
    <link href="<%= ResolveClientUrl("~/Admin/vendors/bower_components/jquery-toast-plugin/dist/jquery.toast.min.css") %>" rel="stylesheet" type="text/css">

    <link href="<%= ResolveClientUrl("~/Admin/dist/css/MySKVCESS.css") %>" rel="stylesheet" />
    <!-- jQuery -->
    <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/jquery/dist/jquery.min.js") %>"></script>
    <link href="<%= ResolveClientUrl("~/Admin/dist/js/jquery-ui.css") %>" rel="stylesheet" />
    <script src="<%= ResolveClientUrl("~/Admin/dist/js/jquery-ui.min.js") %>"></script>
    <!-- Custom CSS -->
    <script src="<%= ResolveClientUrl("~/Admin/ckeditor/ckeditor.js") %>" type="text/javascript"></script>


    <link href="<%=ResolveClientUrl("~/Project_js/alertify.css")%>" rel="stylesheet" type="text/css" />
    <script src="<%=ResolveClientUrl("~/Project_js/alertify.js")%>"></script>
    <script src="<%= ResolveClientUrl("~/Project_js/commonjs.js") %>" type="text/javascript"></script>

    <script src="<%= ResolveClientUrl("~/project_js/radiologyresult.js") %>"></script>
</head>
<body style="background-color: white;zoom:95%">
    <form id="form1" runat="server">
        <div class="wrapper error-page pa-0">
            <fieldset class="fieldSetBorder">
                <legend class="fieldSetLabel">Filter Detail</legend>
                <div class="col-md-12 text-left">
                    <div class="col-md-2">
                        <select id="ddlresultstatus" class="form-control"></select>
                    </div>
                    <div class="col-md-8">
                        <input type="button" id="btnsaveresult" accesskey="S" class="btn btn-success btn-xs" value="Save Result" />
                        <input type="button" id="btnvalidsaveresult" accesskey="V" class="btn btn-warning btn-xs" value="Validate & Save Result" style="display: none" />
                        <input type="button" id="btndeleteresult" accesskey="D" class="btn btn-danger btn-xs" value="Delete Result" />
                        <input type="button" id="btnclose" accesskey="R" class="btn btn-warning btn-xs" value="Close Result" />
                    </div>
                </div>
            </fieldset>
            <header class="sp-header">
                <div class="col-md-12 fixtopsectionbuttom" style="display: none">
                    <div class="row heading-bg col-md-12">
                        <div id="EditHeadTitle" runat="server">
                            <div class="col-md-9">
                                <div class="formheadtitle">Pathology WorkLoad Detail </div>
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdforderid" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfid" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                            </div>
                            <!-- Breadcrumb -->
                            <div class="col-md-3">
                            </div>
                        </div>
                    </div>
                </div>
                <fieldset class="fieldSetBorder">
                    <legend class="fieldSetLabel">Filter Detail</legend>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label mb-10">
                                Template<samp style="color: Red"></samp></label>
                            <select id="ddltemplate" class="form-control" clientidmode="Static">
                            </select>

                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label mb-10">
                                UHID<samp style="color: Red"></samp></label>
                            <input id="txtuhid" class="form-control" placeholder="UHID" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label mb-10">
                                Patient Name<samp style="color: Red"></samp></label>
                            <input id="txtpatientname" class="form-control" placeholder="Patient Name" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label mb-10">
                                TestName<samp style="color: Red"></samp></label>
                            <input id="txttestname" class="form-control" placeholder="TestName" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label mb-10">
                                Doctor<samp style="color: Red"></samp></label>
                            <input id="txtdoctor" class="form-control" placeholder="Doctor Name" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label mb-10">
                                Modility No<samp style="color: Red"></samp></label>
                            <input id="txtmodilityno" class="form-control" placeholder="Modility No" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>

                    <div class="col-md-2" style="display: none">
                        <div class="form-group">
                            <label class="control-label mb-10">
                                Result Date<samp style="color: Red"></samp></label>
                            <input id="txtresultdate" class="form-control" placeholder="Date" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>
                </fieldset>
                <fieldset class="fieldSetBorder">
                    <legend class="fieldSetLabel">Result Detail</legend>
                    <div class="col-md-12">
                        <div class="form-group">
                            <input id="txtradiologyresult" class="ckeditor" placeholder="Result Detail" clientidmode="Static" style="width: 1523px;" />
                            <script type="text/javascript">
                                CKEDITOR.replace('txtradiologyresult', { fullPage: true });
                            </script>

                        </div>
                    </div>

                </fieldset>

            </header>

        </div>
        <!-- Bootstrap Core JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/bootstrap/dist/js/bootstrap.min.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/admin/vendors/bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js") %>"></script>
        <!-- Data table JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/datatables/media/js/jquery.dataTables.min.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/datatables.net-buttons/js/dataTables.buttons.min.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/datatables.net-buttons/js/buttons.flash.min.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/jszip/dist/jszip.min.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/pdfmake/build/pdfmake.min.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/pdfmake/build/vfs_fonts.js") %>"></script>

        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/datatables.net-buttons/js/buttons.html5.min.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/datatables.net-buttons/js/buttons.print.min.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/Admin/dist/js/export-table-data.js") %>"></script>
        <script src="<%= ResolveClientUrl("~/Admin/vendors/chart.js/Chart.min.js") %>"></script>
        <!-- Moment JavaScript -->
        <script type="text/javascript" src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/moment/min/moment-with-locales.min.js") %>"></script>

        <!-- Bootstrap Colorpicker JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js") %>"></script>

        <!-- Switchery JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/switchery/dist/switchery.min.js") %>"></script>

        <!-- Select2 JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/select2/dist/js/select2.full.min.js") %>"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/jquery-toast-plugin/dist/jquery.toast.min.js") %>"></script>

        <!-- Bootstrap Select JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/bootstrap-select/dist/js/bootstrap-select.min.js") %>"></script>

        <!-- Bootstrap Tagsinput JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js") %>"></script>

        <!-- Bootstrap Touchspin JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js") %>"></script>

        <!-- Multiselect JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/multiselect/js/jquery.multi-select.js") %>"></script>


        <!-- Bootstrap Switch JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js") %>"></script>

        <!-- Bootstrap Datetimepicker JavaScript -->
        <script type="text/javascript" src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js") %>"></script>
        <!----Date Picker--->


        <script type="text/javascript" src="<%= ResolveClientUrl("~/Admin/vendors/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js") %>"></script>
        <!-- Form Advance Init JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/dist/js/form-advance-data.js") %>"></script>

        <!-- Slimscroll JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/dist/js/jquery.slimscroll.js") %>"></script>

        <!-- Fancy Dropdown JS -->
        <script src="<%= ResolveClientUrl("~/Admin/dist/js/dropdown-bootstrap-extended.js") %>"></script>

        <!-- Owl JavaScript -->
        <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/owl.carousel/dist/owl.carousel.min.js") %>"></script>

        <!-- Init JavaScript -->

    </form>
</body>
</html>

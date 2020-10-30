<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OutputDisplay.aspx.cs" Inherits="LabMS.Navigation.Output.OutputDisplay" %>

<!DOCTYPE html>
<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.3500.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" Namespace="CrystalDecisions.Web" TagPrefix="CR" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" href="<%= ResolveClientUrl("~/Admin/img/sky.ico") %>" />
    <title>Lab Infotech</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

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

    <script type="text/javascript">
        $(function () {
            Print();
        });
        function Print() {
            var dvReport = document.getElementById("dvReport");
            var frame1 = dvReport.getElementsByTagName("iframe")[0];
            if (navigator.appName.indexOf("Internet Explorer") != -1 || navigator.appVersion.indexOf("Trident") != -1) {
                frame1.name = frame1.id;
                window.frames[frame1.id].focus();
                window.frames[frame1.id].print();
                window.print();
            }
            else {
                //var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
                var frameDoc = frame1.contentWindow ? frame1.contentWindow : (frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument);
                frameDoc.print();
                frame1.name = frame1.id;
                //window.frames[frame1.id].focus();
                //window.frames[frame1.id].Print();
            }
        }
    </script>
</head>
<body style="background-color: darkgray; zoom: 80%;">
    <form id="form1" runat="server">

        <div class="wrapper error-page pa-0">
            <div class="row">
                <div class="col-md-12 col-xs-12">
                    <div class="x_panel">
                        <div id="dvReport">
                          <center> <input type="button" id="btnPrint" class="btn btn-success" value="Print Now" onclick="Print()" />
                            <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server" BorderStyle="Outset" HasCrystalLogo="False"
                                HasToggleGroupTreeButton="true" HasToggleParameterPanelButton="true"
                                ToolPanelView="ParameterPanel" PrintMode="Pdf" HasPrintButton="true" HasExportButton="true" />
                        </center></div>
                    </div>
                </div>
            </div>
            <asp:Panel ID="pnlError" runat="server" Visible="false" Width="955px" Height="415px">
                <table style="width: 100%; height: 100%">
                    <tr>
                        <td style="width: 100%">
                            <span style="font-size: 16pt; color: darkgray; font-family: Arial">
                                <strong><a href="OutputDisplay.aspx">Report Information</a>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <asp:Label Font-Names="Arial" ForeColor="Red" Font-Size="Large" ID="lblErrorMessage" runat="server" Text=""></asp:Label>
                                </strong>
                            </span>
                        </td>
                    </tr>
                </table>
            </asp:Panel>

        </div>
        <!-- /#wrapper -->

        <!-- JavaScript -->


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
        <%--  <script src="<%= ResolveClientUrl("~/Admin/dist/js/init.js") %>"></script>--%>
    </form>
</body>
</html>

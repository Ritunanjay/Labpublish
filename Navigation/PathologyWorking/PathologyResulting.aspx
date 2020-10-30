<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PathologyResulting.aspx.cs" Inherits="LabMS.Navigation.PathologyWorking.PathologyResulting" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
 <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="shortcut icon" href="<%= ResolveClientUrl("~/Admin/img/sky.ico") %>" />
    <title>Lab Infotech</title>

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

    <link href="<%= ResolveClientUrl("~/Admin/dist/css/sky-red.css") %>" rel="stylesheet" />
    <!-- jQuery -->
    <script src="<%= ResolveClientUrl("~/Admin/vendors/bower_components/jquery/dist/jquery.min.js") %>"></script>
    <link href="<%= ResolveClientUrl("~/Admin/dist/js/jquery-ui.css") %>" rel="stylesheet" />
    <script src="<%= ResolveClientUrl("~/Admin/dist/js/jquery-ui.min.js") %>"></script>
    <!-- Custom CSS -->
    <script src="<%= ResolveClientUrl("~/Admin/ckeditor/ckeditor.js") %>" type="text/javascript"></script>


    <link href="<%=ResolveClientUrl("~/Project_js/alertify.css")%>" rel="stylesheet" type="text/css" />
    <script src="<%=ResolveClientUrl("~/Project_js/alertify.js")%>"></script>
    <script src="<%= ResolveClientUrl("~/Project_js/commonjs.js") %>" type="text/javascript"></script>

    <script src="<%= ResolveClientUrl("~/project_js/pathologyresulting.js") %>"></script>
</head>
<body style="background-color: #fff; zoom: 85%;">
    <form id="form1" runat="server">
        <div class="wrapper error-page pa-0">
            <fieldset class="fieldSetBorder">
                <legend class="fieldSetLabel">Result Validation Detail</legend>
                <div class="col-md-12 text-left">
                    <div class="col-md-2">
                        <select id="ddlresultstatus" class="form-control"></select>
                    </div>
                    <div class="col-md-8">
                        <input type="button" id="btnsaveresult" accesskey="S" class="btn btn-success btn-xs" value="Save Result" />
                        <input type="button" id="btnvalidsaveresult" accesskey="V" class="btn btn-warning btn-xs" value="Validate & Save Result" style="display: none" />
                        <input type="button" id="btndeleteresult" accesskey="D" class="btn btn-danger btn-xs" value="Delete Result" />
                        <input type="button" id="btnclose" accesskey="R" class="btn btn-warning btn-xs" value="Close Result" />
                        <label class="panel panel-succes" style="color: #ff0000;">N=Negative</label>
                        <label class="panel panel-succes" style="color: #ff0000;">P=Positive</label>
                        <label class="panel panel-succes" style="color: #ff0000;">NR=Non-reactive</label>
                        <label class="panel panel-succes" style="color: #ff0000;">RE=Reactive</label>
                        <label class="panel panel-succes" style="color: #ff0000;">S=Sensitive</label>
                        <label class="panel panel-succes" style="color: #ff0000;">I=Intermediate</label>
                        <label class="panel panel-succes" style="color: #ff0000;">NO=Not Seen</label>
                        <label class="panel panel-succes" style="color: #ff0000;">NI=Nil</label>
                          
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                         
                            <input id="txtresultdate" class="form-control" placeholder="Date" disabled="disabled" value="" clientidmode="Static" />

                        </div>
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
                    <legend class="fieldSetLabel">Patient Information Detail</legend>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label">
                                UHID<samp style="color: Red"></samp></label>
                            <input id="txtuhid" class="form-control" placeholder="UHID" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label">
                                Patient Name<samp style="color: Red"></samp></label>
                            <input id="txtpatientname" class="form-control" placeholder="Patient Name" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>
                    
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label">
                                AgeSex<samp style="color: Red"></samp></label>
                            <input id="txtagesex" class="form-control" placeholder="AgeSex" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>
                    
                    <div class="col-md-2" style="display:none">
                        <div class="form-group">
                            <label class="control-label">
                                BillNo<samp style="color: Red"></samp></label>
                            <input id="txtbillno" class="form-control" placeholder="BillNo" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>
                    
                    <div class="col-md-2" style="display:none">
                        <div class="form-group">
                            <label class="control-label">
                                SampleNo<samp style="color: Red"></samp></label>
                            <input id="txtsampleno" class="form-control" placeholder="SampleNo" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>
                    <div class="col-md-2" style="display: inline">
                        <div class="form-group">
                            <label class="control-label">
                               Ref Doctor<samp style="color: Red"></samp></label>
                            <input id="txtdoctor" class="form-control" placeholder="Doctor Name" disabled="disabled" value="" clientidmode="Static" />

                        </div>
                    </div>
                  
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label">
                              Reporting Doctor<samp style="color: Red"></samp></label>
                            <select id="ddlreportingdoctor" class="form-control" clientidmode="Static">
                                <option>--Select--</option>
                            </select>

                        </div>
                    </div>
                     <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label">
                                Result Remark<samp style="color: Red"></samp></label>
                            <input id="txtresultremark" class="form-control" placeholder="Result Remark" value="" clientidmode="Static" />

                        </div>
                    </div>
                </fieldset>
                <fieldset class="fieldSetBorder">
                    <legend class="fieldSetLabel">Result Filling Detail</legend>
                    <div class="col-md-12" style="height: 570px; overflow: scroll;">
                        <div class="form-group">
                            <table class="table table-striped table-hover table-bordered" id="gvTest" style="padding: 0px !important;">
                                <thead>
                                    <tr>
                                        <th class="hidden-phone">SNo
                                        </th>
                                        <%-- <th>TestName
                                        </th>--%>
                                        <th>ItemName
                                        </th>
                                        <th>Result
                                        </th>
                                        <th>Action
                                        </th>
                                        <th>MachineResult
                                        </th>
                                        <th>Unit
                                        </th>
                                        <th>NormalRange
                                        </th>
                                        <th>Flag
                                        </th>
                                          <th>Recheck<input type="checkbox" checked="checked" class="lnkallrecheck" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="gvresult">
                                </tbody>
                            </table>

                        </div>
                    </div>
                </fieldset>

            </header>

        </div>
        <!-- /#wrapper -->
        <!--Worksheet--->
        <div id="ModalHelp" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h5 class="modal-title">Create Help [<span id="helpitemname" style="color: blueviolet"></span>]</h5>
                    </div>
                    <div class="modal-body">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Create Help</legend>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label mb-10">
                                        Help
                                    <samp style="color: Red"></samp>
                                    </label>
                                    <input id="txthelp" class="form-control" placeholder="Help" clientidmode="Static" />
                                    <input id="txthelphtml" class="ckeditor" placeholder="Help Detail" clientidmode="Static" />
                                    <script type="text/javascript">
                                        CKEDITOR.replace('txthelphtml', { fullPage: true });
                                    </script>

                                </div>
                            </div>
                            <input type="button" class="btn btnsubmitreset btn-xs" value="Add Help" id="btnaddhelp" />
                        </fieldset>
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Item Help List</legend>
                            <table id="gvhelplist" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                            </table>
                        </fieldset>
                    </div>

                </div>
            </div>
        </div>
        <!-- JavaScript -->
        <!--Worksheet--->
        <div id="ModalComment" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h5 class="modal-title">Create Comment [<span id="commentTest" style="color: blueviolet"></span>]</h5>
                    </div>
                    <div class="modal-body">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Create Comment</legend>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label mb-10">
                                        Comment
                                    <samp style="color: Red"></samp>
                                    </label>
                                    <input id="txtcommenthtml" class="ckeditor" placeholder="Comment Detail" clientidmode="Static" />
                                    <script type="text/javascript">
                                        CKEDITOR.replace('txtcommenthtml', { fullPage: true });
                                    </script>

                                </div>
                            </div>
                            <input type="button" class="btn btnsubmitreset btn-xs" value="Add Comment" id="btnaddcomment" />
                        </fieldset>
                    </div>

                </div>
            </div>
        </div>
        <!--Insert--->
        <div id="ModalInsert" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h5 class="modal-title">Create Insert [<span id="spanitemname" style="color: blueviolet"></span>]</h5>
                    </div>
                    <div class="modal-body">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Create Insert</legend>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label mb-10">
                                        Insert
                                    <samp style="color: Red"></samp>
                                    </label>
                                    <input id="txtinsert" class="ckeditor" placeholder="Insert Detail" clientidmode="Static" />
                                    <script type="text/javascript">
                                        CKEDITOR.replace('txtinsert', { fullPage: true });
                                    </script>

                                </div>
                            </div>
                            <input type="button" class="btn btnsubmitreset btn-xs" value="Add Insert" id="btnaddinsert" />
                        </fieldset>
                    </div>

                </div>
            </div>
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
        <%--  <script src="<%= ResolveClientUrl("~/Admin/dist/js/init.js") %>"></script>--%>
    </form>
</body>
</html>

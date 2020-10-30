<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="InvestigationDetail.aspx.cs" Inherits="ITHospital.Navigation.Labourtary.InvestigationDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/investigationdetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Investigation Detail</h5>
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>
        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>
            <fieldset class="fieldSetBorder">
                <legend class="fieldSetLabel">Add New Investigation Detail</legend>

                <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                    <div class="panel-body">

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Code/Name<samp style="color: Red">*</samp></label>
                                <asp:HiddenField ID="hdftestid" runat="server" ClientIDMode="static" Value="0" />
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                <input id="txtinvestigationcode" class="form-control" placeholder=" Code" clientidmode="Static" />

                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Name<samp style="color: Red">*</samp></label>
                                <input id="txtinvestigationname" class="form-control" placeholder="Investigation Name" clientidmode="Static" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Display Name<samp style="color: Red">*</samp></label>
                                <input id="txtinvestigationdisplay" class="form-control" placeholder="Display Name" clientidmode="Static" />
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Machine<samp style="color: Red">*</samp></label>
                                <select id="ddlmachine" class="form-control" clientidmode="Static">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Investigation Group<samp style="color: Red">*</samp></label>
                                <select id="ddlgroup" class="form-control" clientidmode="Static">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Sample
                                    <samp style="color: Red">*</samp></label>
                                <select id="ddlsample" class="form-control" clientidmode="Static">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Test For<samp style="color: Red">*</samp></label>
                                <select id="ddltestfor" class="form-control" clientidmode="Static">
                                    <option value="B">Both</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>

                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Report Days/SNo<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtreportdays" class="form-control" placeholder="Report Days" style="width: 50%" onfocus="allownumericwithoutdecimal(this)" value="0" clientidmode="Static" />
                                        <input id="txtorder" class="form-control" placeholder="Order No" style="width: 50%" onfocus="allownumericwithoutdecimal(this)" value="0" clientidmode="Static" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Nabl/Blank<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlnabl" class="form-control" clientidmode="Static" style="width: 50%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                        <select id="ddlblank" class="form-control" clientidmode="Static" style="width: 50%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label">
                                        Outsource/SpecialReport<samp style="color: Red">*</samp></label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddloutsource" class="form-control" clientidmode="Static" style="width: 50%">
                                                <option value="false">No</option>
                                                <option value="true">Yes</option>
                                            </select>
                                            <select id="ddlspecialreport" class="form-control" clientidmode="Static" style="width: 50%">
                                                <option value="false">No</option>
                                                <option value="true">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label">
                                        New Page<samp style="color: Red">*</samp></label>
                                    <select id="ddlnewpage" class="form-control" clientidmode="Static">
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label">
                                        ReportType<samp style="color: Red">*</samp></label>

                                    <select id="ddlreporttype" class="form-control" clientidmode="Static">
                                    </select>
                                </div>
                            </div>


                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label">
                                        <%--DueDays/--%>TAT Time<samp style="color: Red">*</samp></label>
                                    <input id="txtduedays" class="form-control" placeholder="Duedays" style="width: 50%; display: none;" onfocus="allownumericwithoutdecimal(this)" value="0" clientidmode="Static" />
                                    <input id="txttattime" class="form-control" placeholder="TAT Time" value="0" clientidmode="Static" />
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label">
                                        TAT Alarm<samp style="color: Red">*</samp></label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txttatalarm" class="form-control" placeholder="TAT Alarm" value="0" clientidmode="Static" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label">
                                        Discount/Show<samp style="color: Red">*</samp></label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddldiscount" class="form-control" clientidmode="Static" style="width: 50%">
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                            <select id="ddldisplay" class="form-control" clientidmode="Static" style="width: 50%">
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4" style="display: none;">
                            <div class="form-group">
                                <label class="control-label">
                                    IsComment/Comment<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">

                                        <select id="ddlcommentHead" class="form-control" clientidmode="Static" style="width: 70%">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    IsCommentPrint<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlprintcomment" class="form-control" clientidmode="Static">
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Status<samp style="color: Red">*</samp></label>
                                <select id="ddlstatus" class="form-control" clientidmode="Static">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-2" style="display: none">
                            <div class="form-group">
                                <label class="control-label">
                                    Type<samp style="color: Red">*</samp></label>
                                <select id="ddltype" class="form-control" clientidmode="Static">
                                    <option value="P">Pathology</option>
                                    <option value="R">Radiology</option>
                                    <option value="A">Allergy</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </fieldset>
            <fieldset class="fieldSetBorder">
                <legend class="fieldSetLabel">Investigation Item Detail </legend>
                <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="">
                    <div class="panel-body" style="overflow-x: scroll">
                        <table class="table table-striped table-hover table-bordered dt-responsive" id="gvTestList" style="padding: 0px !important;">
                            <thead>
                                <tr>
                                    <th class="hidden-phone">Action
                                    </th>
                                    <th>SNo
                                    </th>
                                    <th>Method</th>
                                    <th>ISN
                                    </th>
                                    <th>Detail
                                    </th>
                                    <th>Output
                                    </th>
                                    <th>Unit
                                    </th>
                                    <%--<th>NormalRange
                                    </th>
                                    <th>1 Month
                                    </th>
                                    <th>6 Month
                                    </th>
                                    <th>12 Month
                                    </th>
                                    <th>Normal Male
                                    </th>
                                    <th>Normal Female
                                    </th>
                                    <th>3 Month
                                    </th>
                                    <th>1 Day
                                    </th>
                                    <th>NormalExtra1
                                    </th>
                                    <th>NormalExtra2
                                    </th>
                                    <th>NormalExtra3
                                    </th>
                                    <th>NormalExtra4
                                    </th>--%>
                                    <th>Alarm Range
                                    </th>
                                    <th>MachineCode
                                    </th>
                                    <th>Formula
                                    </th>
                                    <th>FormatResult
                                    </th>

                                    <th>Bold
                                    </th>
                                    <th>Italic
                                    </th>
                                    <th>Headline
                                    </th>
                                    <th>Line
                                    </th>
                                    <th>HelpCode
                                    </th>


                                </tr>
                            </thead>
                            <tbody id="investigationitemgv">
                            </tbody>
                        </table>
                        <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                        </table>
                    </div>
                </div>
            </fieldset>
        </div>



        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add Investigation" />
                <input type="button" id="btnworksheet" value="Worksheet" class="btn btn-warning btn-xs" style="display: none" />
                <input type="button" id="btnviewcomment" value="Comment" class="btn btn-warning btn-xs" />
                <input type="button" id="btninvestigationsearch" class="btn btn-default btn-xs" value="Investigation List" />
                <input type="button" id="btnclear" class="btn btn-danger btn-xs" value="Clear" />
                <input type="button" id="btnrowadd" value="Add Default Row" class="btn btn-success btn-xs" />
            </div>
        </div>
    </div>
    <div id="ModalInvestigation" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title" id="myLargeModalLabel">Investigation Detail</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Investigation Detail Search</legend>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Investigation Detail
                                    <samp style="color: Red">*</samp></label>
                                <select id="ddldetail" class="form-control" clientidmode="Static">
                                    <option value="C">Top 50</option>
                                    <option value="A">All</option>
                                </select>

                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <label class="control-label">
                                    Investigation Name Search
                                    <samp style="color: Red">*</samp></label>
                                <input id="txttestname" class="form-control" placeholder="TestName" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-12">
                            <table id="gvinvestigation" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                            </table>
                        </div>

                    </fieldset>
                </div>
                <div class="modal-footer">
                    <hr />
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        Close</button>
                </div>
            </div>
        </div>
    </div>

    <!--Worksheet--->
    <div id="ModalWorksheet" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Create Worksheet [<span id="investigationworksheet" style="color: blueviolet"></span>]</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Create Worksheet</legend>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">
                                    Worksheet
                                    <samp style="color: Red"></samp>
                                </label>
                                <input id="txtworksheet" class="form-control" placeholder="Worksheet" clientidmode="Static" />
                                <input id="txtworksheethtml" class="ckeditor" placeholder="Worksheet Detail" clientidmode="Static" />
                                <script type="text/javascript">
                                    CKEDITOR.replace('txtworksheethtml', { fullPage: true });
                                </script>

                            </div>
                        </div>
                        <input type="button" class="btn btnsubmitreset btn-xs" value="Add Worksheet" id="btnaddworksheet" />
                    </fieldset>
                </div>
                <%--<div class="modal-footer">
                    <hr />
                  
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
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
                                <label class="control-label">
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
                <%--<div class="modal-footer">
                    <hr />
                  
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
            </div>
        </div>
    </div>
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
                                <label class="control-label">
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
                <%--<div class="modal-footer">
                    <hr />
                  
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
            </div>
        </div>
    </div>

    <!------Help----->
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
                                <label class="control-label">
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
                <%--<div class="modal-footer">
                    <hr />
                  
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
            </div>
        </div>
    </div>


    <!--Addrange--->
    <div id="ModalRange" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Create Range [<span class="lnkrangeitem" style="color: blueviolet"></span>]</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Create Range Detail</legend>
                        <div class="col-md-12">

                            
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label">
                                        From Age
                                    <samp style="color: Red"></samp>
                                    </label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txtfromage" class="form-control" style="width: 60%" placeholder="From Age" onfocus="allownumericwithoutdecimal(this);" clientidmode="Static" />
                                            <select id="ddlfromage" class="form-control" style="width: 40%">
                                                <option value="D">Days</option>
                                                <option value="M">Month</option>
                                                <option value="Y">Year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label">
                                        To Age
                                    <samp style="color: Red"></samp>
                                    </label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txttoage" class="form-control" style="width: 60%" placeholder="To Age" onfocus="allownumericwithoutdecimal(this);" clientidmode="Static" />
                                            <select id="ddltoage" class="form-control" style="width: 40%">
                                                <option value="D">Days</option>
                                                <option value="M">Month</option>
                                                <option value="Y">Year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label">
                                        Gender
                                    <samp style="color: Red"></samp>
                                    </label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddlgender" class="form-control" style="width: 100%">
                                                <option value="B">Both</option>
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label">
                                        NormalRange
                                    <samp style="color: Red"></samp>
                                    </label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txtmasternormalrange" class="form-control" style="width: 100%" placeholder="Normal Range" clientidmode="Static" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <input type="button" class="btn btnsubmitreset btn-xs" value="Add Range" id="btnaddnormalrange" />
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Item Range List</legend>
                        <table id="gvnormalrange" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                        </table>
                    </fieldset>
                </div>
                <%--<div class="modal-footer">
                    <hr />
                  
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
            </div>
        </div>
    </div>
</asp:Content>

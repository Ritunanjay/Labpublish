<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="InvestigationPackage.aspx.cs" Inherits="LabMS.Navigation.Labourtary.InvestigationPackage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <script src="<%= ResolveClientUrl("~/project_js/investigationpackagedetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Package Information Detail</h5>
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>
        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%; height: auto;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <div class="col-md-12">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Add New Package</legend>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label">
                                        Package Code/Name<samp style="color: Red">*</samp></label>
                                    <asp:HiddenField ID="hdftestid" runat="server" ClientIDMode="static" Value="0" />
                                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txtinvestigationcode" class="form-control" placeholder="Code" onfocus="uppercase(this);" clientidmode="Static" style="width: 30%" />
                                            <input id="txtinvestigationname" class="form-control" placeholder="Package Name" onfocus="titlecase(this);" clientidmode="Static" style="width: 70%" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label">
                                       Package Group<samp style="color: Red">*</samp></label>
                                    <select id="ddlgroup" class="form-control" clientidmode="Static">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6" style="display:none">
                                <div class="form-group">
                                    <label class="control-label">
                                        Machine<samp style="color: Red">*</samp></label>
                                    <select id="ddlmachine" class="form-control" clientidmode="Static">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="display: none">
                                <div class="form-group">
                                    <label class="control-label">
                                        Report Days<samp style="color: Red">*</samp></label>
                                    <input id="txtreportdays" class="form-control" placeholder="Report Days" onfocus="allownumericwithoutdecimal(this)" value="0" clientidmode="Static" />

                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label">
                                        Order<samp style="color: Red">*</samp></label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txtorder" class="form-control" placeholder="Order No" onfocus="allownumericwithoutdecimal(this)" value="0" clientidmode="Static" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3" style="display:none">
                                <div class="form-group">
                                    <label class="control-label">
                                        Sample<samp style="color: Red">*</samp></label>
                                    <select id="ddlsample" class="form-control" clientidmode="Static">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6" style="display:none">
                                <div class="form-group">
                                    <label class="control-label">
                                        TestFor/Display<samp style="color: Red">*</samp></label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddltestfor" class="form-control" clientidmode="Static" style="width: 50%">
                                                <option value="B">Both</option>
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>

                                            </select>
                                            <select id="ddldisplay" class="form-control" clientidmode="Static" style="width: 50%">
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-2" style="display: none">
                                <div class="form-group">
                                    <label class="control-label">
                                        Print Comment<samp style="color: Red">*</samp></label>
                                    <select id="ddlprintcomment" class="form-control" clientidmode="Static">
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="display: none">
                                <div class="form-group">
                                    <label class="control-label">
                                        NewPage<samp style="color: Red">*</samp></label>
                                    <select id="ddlnewpage" class="form-control" clientidmode="Static">
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-2" style="display: none">
                                <div class="form-group">
                                    <label class="control-label">
                                        Report Type<samp style="color: Red">*</samp></label>
                                    <select id="ddlreporttype" class="form-control" clientidmode="Static">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6" style="display:none">
                                <div class="form-group">
                                    <label class="control-label">
                                        Nabl/Outsource<samp style="color: Red">*</samp></label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddlnabl" class="form-control" clientidmode="Static" style="width: 50%">
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                            <select id="ddloutsource" class="form-control" clientidmode="Static" style="width: 50%">
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2" style="display: none">
                                <div class="form-group">
                                    <label class="control-label">
                                        Blank<samp style="color: Red">*</samp></label>
                                    <select id="ddlblank" class="form-control" clientidmode="Static">
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-2" style="display: none">
                                <div class="form-group">
                                    <label class="control-label">
                                        Special Report<samp style="color: Red">*</samp></label>
                                    <select id="ddlspecialreport" class="form-control" clientidmode="Static">
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="display:none">
                                <div class="form-group">
                                    <label class="control-label">
                                        DueDays<samp style="color: Red">*</samp></label>
                                    <input id="txtduedays" class="form-control" placeholder="Duedays" onfocus="allownumericwithoutdecimal(this)" value="0" clientidmode="Static" />

                                </div>
                            </div>
                            <div class="col-md-4" style="display:none">
                                <div class="form-group">
                                    <label class="control-label">
                                        TAT Time<samp style="color: Red">*</samp></label>
                                    <input id="txttattime" class="form-control" placeholder="TAT Time" value="0" clientidmode="Static" />

                                </div>
                            </div>
                            <div class="col-md-3" style="display:none">
                                <div class="form-group">
                                    <label class="control-label">
                                        TAT Alarm<samp style="color: Red">*</samp></label>
                                    <input id="txttatalarm" class="form-control" placeholder="TAT Alarm" value="0" clientidmode="Static" />

                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label">
                                        Status<samp style="color: Red">*</samp></label>
                                    <select id="ddlstatus" class="form-control" clientidmode="Static">
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-md-12">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Investigation Search Here</legend>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label">
                                        Investigation List<samp style="color: Red">*</samp></label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txtautoinvestigation" class="form-control" placeholder="Investigation Search Name" clientidmode="Static" style="width: 80%;" />
                                            <input id="btnsaveitem" type="button" accesskey="A" class="form-control" value="Add Package Item" style="width: 20%; background-color: #336699; color: #fdf9f9;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12" style="height: 197px; overflow: scroll">
                                <table class="table table-striped table-hover table-bordered dt-responsive" id="gvTestList" style="padding: 0px !important;">
                                    <thead>
                                        <tr>
                                            <th class="hidden-phone">Action
                                            </th>
                                            <th>Investigation Code
                                            </th>
                                            <th>Investigation Name
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody id="investigationlist">
                                    </tbody>
                                </table>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-md-12">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Package Detail Search</legend>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label">
                                        Package Name Search
                                    <samp style="color: Red">*</samp></label>
                                    <input id="txttestname" class="form-control" placeholder="Package Name" clientidmode="Static" />

                                </div>
                            </div>
                            <div class="col-md-12">
                                <table id="gvinvestigation" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                                </table>
                            </div>

                        </fieldset>
                    </div>
                </div>
            </div>

        </div>
        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add New Profile" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" accesskey="C" />
                <input type="button" id="btninvestigationsearch" class="btn btn-info btn-xs" value="Profile List" style="display: none" />
            </div>
        </div>
    </div>
    <div id="ModalInvestigation" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title" id="myLargeModalLabel">Package Detail</h5>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <hr />
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        Close</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

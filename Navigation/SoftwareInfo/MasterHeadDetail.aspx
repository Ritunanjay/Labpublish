<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="MasterHeadDetail.aspx.cs" Inherits="ITHospital.Navigation.SoftwareInfo.MasterHeadDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/masterheaddetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Head Detail Information</h5>
                    <asp:HiddenField ID="hdfheaddetailid" runat="server" ClientIDMode="static" Value="0" />
                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Add New HeadDetail</legend>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Main Head<samp style="color: Red">*</samp></label>
                                <select id="ddlhead" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Code<samp style="color: Red">*</samp></label>
                                <input id="txtcode" class="form-control" placeholder="Code" onfocus="uppercase(this)" maxlength="5" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="control-label">
                                    Head Detail<samp style="color: Red">*</samp></label>
                                <input id="txtheaddetail" class="form-control" placeholder="Head Detail" clientidmode="Static" />

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
                        </div> <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Option 1<samp style="color: Red"></samp></label>
                                <input id="txtoption1" class="form-control" placeholder="Option 1" onfocus="titlecase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Option 2<samp style="color: Red"></samp></label>
                                <input id="txtoption2" class="form-control" placeholder="Option 2" onfocus="titlecase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Option 3<samp style="color: Red"></samp></label>
                                <input id="txtoption3" class="form-control" placeholder="Option 3" onfocus="titlecase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Option 4<samp style="color: Red"></samp></label>
                                <input id="txtoption4" class="form-control" placeholder="Option 4" onfocus="titlecase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        

                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Head Information Detail List</legend>
                        <div class="col-md-12" style="overflow: scroll">
                            <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>

        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add" />
                <input type="button" id="btnclear" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
    <!--Modal Popup for Chief Complaint-->

</asp:Content>

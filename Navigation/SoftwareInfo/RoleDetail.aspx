<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="RoleDetail.aspx.cs" Inherits="ITHospital.Navigation.SoftwareInfo.RoleDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/role.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <div class="container-fluid">
        <!--Head section --->

        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Designation/Role Information</h5>
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
                        <legend class="fieldSetLabel">Add New Designation/Role</legend>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Designation/Role Name<samp style="color: Red">*</samp></label>
                                <asp:HiddenField ID="hdfroleid" runat="server" ClientIDMode="static" Value="0" />
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                <input id="txtrole" class="form-control" onfocus="uppercase(this)" placeholder="Role Name" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                   Designation Detail<samp style="color: Red">*</samp></label>
                                <input id="txtroledetail" class="form-control" onfocus="titlecase(this)" placeholder="Detail" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Project Theme<samp style="color: Red"></samp></label>
                                <select id="ddltheme" class="form-control" clientidmode="Static">
                                    <option value="1">Theme 1</option>
                                    <option value="2">Theme 2</option>
                                    <option value="3">Theme 3</option>
                                    <option value="4">Theme 4</option>
                                    <option value="5">Theme 5</option>
                                    <option value="6">Theme 6</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Status<samp style="color: Red"></samp></label>
                                <select id="ddlstatus" class="form-control" clientidmode="Static">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Designation/Role List</legend>
                        <div id="collapse_1" class="fixed-table-container" aria-expanded="true" style="overflow:scroll">
                            <div class="panel-body">
                                <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                                </table>
                            </div>
                        </div>
                    </fieldset>

                </div>
            </div>
        </div>

        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add Designation/Role" />
                <input type="button" id="btnclear" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
    <!--Modal Popup for Chief Complaint-->

</asp:Content>

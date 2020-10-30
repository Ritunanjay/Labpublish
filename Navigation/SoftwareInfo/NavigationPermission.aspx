<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="NavigationPermission.aspx.cs" Inherits="ITHospital.Navigation.SoftwareInfo.NavigationPermission" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/navigationpermission.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid" style="zoom: 95%">
        <!--Head section --->

        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Software Authentication Detail According To Position/User</h5>

                    <asp:HiddenField ID="hdfnavigationid" runat="server" ClientIDMode="Static" Value="0" />
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

            <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Navigation Permission Filter</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Main Navigation<samp style="color: Red">*</samp></label>
                                <select id="ddltype" class="form-control" clientidmode="Static">
                                    <option value="0">All</option>
                                    <option value="1">Main Navigation</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Permission Type<samp style="color: Red"></samp></label>
                                <select id="ddloption" class="form-control" clientidmode="Static">
                                    <option value="role">Role Wise</option>
                                    <option value="user">User Wise</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Option <samp style="color: Red"></samp></label>
                                <select id="ddlrole" class="form-control" clientidmode="Static">
                                </select>
                            </div>
                        </div>
                       <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Permission <samp style="color: Red"></samp></label>
                          <select class="form-control" id="ddlpermission">
                              <option value="1">All Access</option>
                              <option value="2">All Add</option>
                              <option value="3">All Modify</option>
                              <option value="4">All Delete</option>
                              <option value="5">All Print</option>
                          </select>
                                </div></div> <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Permission <samp style="color: Red"></samp></label>
                          <select class="form-control" id="ddlpermissiontype">
                              <option value="true">Allow</option>
                              <option value="false">Denied</option>
                            </select>
                                </div></div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Navigation Permission List</legend>
                        <div id="Div1" class="fixed-table-container" aria-expanded="true" style="overflow: scroll">
                            <div class="panel-body">
                                <table id="gv" class="table table-hover table-bordered dt-responsive" style="width: 100%; overflow: scroll">
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

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Save Permission" />
                <input type="button" id="btnpermissionaccess" class="btn btn-success btn-xs" value="Modify Access Permission" />
                <input type="button" id="btnclear" class="btn  btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
</asp:Content>

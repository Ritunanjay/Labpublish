<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="SoftwareSetting.aspx.cs" Inherits="LabMS.Navigation.SoftwareInfo.SoftwareSetting" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/softwaresetting.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->

        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Software Setting & Authorization Permission</h5>
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
            <fieldset class="fieldSetBorder">
                <legend class="fieldSetLabel">Crediential Detail</legend>
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
                            Option
                            <samp style="color: Red"></samp>
                        </label>
                        <select id="ddlrole" class="form-control" clientidmode="Static">
                        </select>
                    </div>
                </div>
            </fieldset>
            <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">

                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Software Setting List</legend>

                        <table id="gv" class="table table-hover table-bordered dt-responsive" style="width: 100%;">
                        </table>
                    </fieldset>
                </div>
            </div>
        </div> <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Permit All Setting" />
                <input type="button" id="btnclear" class="btn  btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
</asp:Content>

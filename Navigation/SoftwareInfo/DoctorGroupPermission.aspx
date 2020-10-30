<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="DoctorGroupPermission.aspx.cs" Inherits="LabMS.Navigation.SoftwareInfo.DoctorGroupPermission" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  <script src="<%= ResolveClientUrl("~/project_js/doctorgrouppermission.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->

        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Doctor Group Permission Information Detail</h5>
                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%; height: auto">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Group Information Detail</legend>

                        <div class="col-sm-4">
                            <table class="table table-responsive table-bordered" id="gv">
                            </table>
                        </div>
                        <div class="col-sm-8" style="overflow: scroll">
                            <table class="table table-responsive table-bordered" id="gvcentre">
                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Authorized Permission" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-danger btn-xs" value="Refresh" accesskey="C" />
            </div>
        </div>
    </div>

</asp:Content>


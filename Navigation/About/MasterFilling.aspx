<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="MasterFilling.aspx.cs" Inherits="LabMS.Navigation.About.MasterFilling" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
    <script src="<%= ResolveClientUrl("~/project_js/excel_masterfilling.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
  <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Master Filling Form</h5>
                    <asp:HiddenField ID="hdfpapersetid" runat="server" ClientIDMode="static" Value="0" />
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
                        <legend class="fieldSetLabel">Pathology Master Save</legend>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Detail Information <samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlmasterfilling" class="form-control"></select>
                                    </div>
                                </div>
                            </div>
                        </div>  <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    File<samp style="color: Red">*</samp></label>
                                <input type="file" id="excelfile" clientidmode="static" />
                             </div>
                        </div>
                               
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Pathology Master Detail List</legend>
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
                <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add New Master" />
                <input type="button" id="btnclear" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>

</asp:Content>

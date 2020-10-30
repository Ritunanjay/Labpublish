<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="PathologyReporting.aspx.cs" Inherits="LabMS.Navigation.Reporting.PathologyReporting" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
 <script src="<%= ResolveClientUrl("~/project_js/pathreportingsending.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Reporting Sending Detail </div>
                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfbillid" runat="server" ClientIDMode="Static" Value="0" />
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

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 1%;">

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                      <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Filter Detail</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    From Date</label>
                                <input id="txtfromdate" class="form-control" readonly />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    To Date</label>
                                <input id="txttodate" class="form-control" readonly />
                            </div>
                        </div>  <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                   Centre</label>
                                <select id="ddlcentre" class="form-control"  >
                                    </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label ">
                                    Advance Search Detail</label>
                                <input id="txtpatientfilter" placeholder="Advance Search Here" class="form-control" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Reporting Detail</legend>

                        <div class="col-md-12" style="overflow: scroll; height: 550px; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gv">
                                </table>
                            </div>
                        </div>
                    </fieldset>


                </div>
                <div class="col-md-12 fixbuttonsectionbuttom">
                    <div class="col-md-12 text-center">
                        <input type="button" id="btnadd" accesskey="E" class="btn btn-success btn-xs" value="Send Report Email" />
                        <input type="button" id="btnsms" accesskey="S" class="btn btn-success btn-xs" value="Send Report SMS" />
                        <input type="button" id="btnreset" accesskey="R" class="btn btn-warning btn-xs" value="Refresh" />
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
    </asp:Content>
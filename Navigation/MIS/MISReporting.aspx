<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="MISReporting.aspx.cs" Inherits="LabMS.Navigation.MIS.MISReporting" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/misreporting.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">MIS Reporting </div>
                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
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
        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Filter Panel</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    From Date</label>
                                <input id="txtfromdate" class="form-control input-sm" readonly placeholder="(dd/MM/yyyy)" clientidmode="static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    To Date</label>
                                <input id="txttodate" class="form-control input-sm" readonly placeholder="(dd/MM/yyyy)" clientidmode="static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Centre</label>
                                <select id="ddlcentre" class="form-control input-sm" clientidmode="static"></select>

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    User</label>
                                <select id="ddluser" class="form-control input-sm" clientidmode="static"></select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Consultant</label>
                                <select id="ddldoctor" class="form-control input-sm" clientidmode="static"></select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Patient Category</label>
                                <select id="ddlpatientcategory" class="form-control input-sm" clientidmode="static"></select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Paymode</label>
                                <select id="ddlpaymode" class="form-control input-sm" clientidmode="static"></select>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Receipt Type</label>
                                <select id="ddlreceipttype" class="form-control input-sm" clientidmode="static">
                                    <option value="">All</option>
                                    <option value="Receipt">Receipt</option>
                                    <option value="Refund">Refund</option>
                                </select>
                            </div>
                        </div>  
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Reporting Detail</legend>
                      
                        <div class="col-md-12">
                            <div class="form-group">
                                <div id="reportingdetail">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

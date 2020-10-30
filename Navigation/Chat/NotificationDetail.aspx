<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="NotificationDetail.aspx.cs" Inherits="LabMS.Navigation.Chat.NotificationDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<script src="<%= ResolveClientUrl("~/project_js/notificationdetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Notification Information Detail</h5>
                    <asp:HiddenField ID="hdfnotificationid" runat="server" ClientIDMode="static" Value="0" />
                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>
        <div class="panel panel-default card-view panel-refresh" style="margin-top: 2%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>
            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Add New Notification Detail</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Designation<samp style="color: Red"></samp></label>
                                <select id="ddlrole" class="form-control">
                                </select>

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Notification Subject<samp style="color: Red">*</samp></label>
                                <input id="txtnotificationhead" class="form-control" placeholder="Notification Subject" onfocus="uppercase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">
                                    Notification<samp style="color: Red">*</samp></label>
                                <input id="txtnotification" class="form-control" placeholder="Notification" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Notification Date<samp style="color: Red"></samp></label>
                                <input id="txtdate" class="form-control" placeholder="Notification Date" disabled="disabled" onfocus="uppercase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Notification Time<samp style="color: Red"></samp></label>
                                <input id="txttime" class="form-control" placeholder="Notification Time" disabled="disabled" onfocus="uppercase(this)" clientidmode="Static" />

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
                        <legend class="fieldSetLabel">Notification Detail List</legend>
                        <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                        </table>
                    </fieldset>
                </div>
            </div>
        </div>
        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">
                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add Notification" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
    <!--Modal Popup for Chief Complaint-->

</asp:Content>

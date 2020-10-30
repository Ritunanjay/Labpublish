<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="EmailSetting.aspx.cs" Inherits="ITHospital.Navigation.SoftwareInfo.EmailSetting" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/emailsetting.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">EmailSetup Information</h5>
                    <asp:HiddenField ID="hdfemailsetupid" runat="server" ClientIDMode="static" Value="0" />
                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>
        <!--Head section --->
        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>
            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Add New EmailSetting</legend>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Centre<samp style="color: Red"></samp></label>
                                <select id="ddlcentre" class="form-control" clientidmode="Static">
                                    <option value="1">select</option>
                                </select>

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Email Type<samp style="color: Red"></samp></label>
                                <select id="ddlemailtype" class="form-control" clientidmode="Static">
                                </select>

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    EmailID<samp style="color: Red">*</samp></label>
                                <input id="txtemailid" class="form-control" placeholder="EmailID" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Password<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtpassword" type="password" class="form-control" placeholder="Password" clientidmode="Static" style="width: 80%" />
                                        <input type="button" value="Show" class="btn btn-success btn-xs" id="passwordview" style="width: 20%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    SMTP<samp style="color: Red">*</samp></label>
                                <input id="txtsmtp" class="form-control" placeholder="SMTP" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Port<samp style="color: Red">*</samp></label>
                                <input id="txtport" class="form-control" placeholder="Port" clientidmode="Static" />

                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    IsDefault<samp style="color: Red"></samp></label>
                                <select id="ddlisdefault" class="form-control" clientidmode="Static">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
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
                        <legend class="fieldSetLabel">Email Setting List</legend>
                        <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="overflow: scroll">
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

                <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add EmailSetup" />
                <input type="button" id="btnclear" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>

</asp:Content>

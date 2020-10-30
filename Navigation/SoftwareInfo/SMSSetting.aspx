<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="SMSSetting.aspx.cs" Inherits="LabMS.Navigation.SoftwareInfo.SMSSetting" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
 <script src="<%= ResolveClientUrl("~/project_js/smssetting.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">SMS Setup Information</h5>
                    <asp:HiddenField ID="hdfsmssettingid" runat="server" ClientIDMode="static" Value="0" />
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
                        <legend class="fieldSetLabel">Add New SMSSetup</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Franchise<samp style="color: Red"></samp></label>
                                <select id="ddlcentre" class="form-control" clientidmode="Static">
                               </select>

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                   SenderID<samp style="color: Red"></samp></label>
                                 <input id="txtsenderid" class="form-control" placeholder="SenderID" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Username<samp style="color: Red">*</samp></label>
                                <input id="txtusername" class="form-control" placeholder="Username" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Password<samp style="color: Red">*</samp></label>
                                <input id="txtpassword" type="password" class="form-control" placeholder="Password" clientidmode="Static" />

                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Return<samp style="color: Red">*</samp></label>
                                <input id="txtsuccesscode" class="form-control" placeholder="Return" clientidmode="Static" />

                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    IsDefault<samp style="color: Red"></samp></label>
                                <select id="ddlisdefault" class="form-control" clientidmode="Static">
                                    <option value="false">No</option>
                                  <option value="true">Yes</option>
                                  </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    URL<samp style="color: Red">*</samp></label>
                                <input id="txturl" class="form-control" placeholder="URL" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    URLDetail<samp style="color: Red">*</samp></label>
                                <input id="txturlparameter" class="form-control" placeholder="Url Detail" clientidmode="Static" />

                            </div>
                        </div> <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Psplit<samp style="color: Red">*</samp></label>
                                <input id="txtpsplit" class="form-control" placeholder="Psplit" clientidmode="Static" />

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
                        <legend class="fieldSetLabel">SMSSetup List</legend>
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

                <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add SMSSetup" />
                <input type="button" id="btnclear" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
   
</asp:Content>

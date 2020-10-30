<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="ChangeUserPassword.aspx.cs" Inherits="LabMS.Navigation.Dashboard.ChangeUserPassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/changeuserpassword.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Change User Password</h5>
                    <asp:HiddenField ID="hdftrackingId" runat="server" ClientIDMode="static" Value="0" />
                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            <div class="refresh-container">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <div class="col-md-12">
                      <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Modify Password Detail</legend>
                           <div class="col-md-4">
                        </div>
                           <div class="col-md-4">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">
                                            Old Password<samp style="color: Red">*</samp></label>
                                        <div class="input-group">
                                            <div class="input-group-btn">
                                                <input id="txtboldpassword" type="password" class="form-control" placeholder="Old Password" clientidmode="Static" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">
                                            New Password<samp style="color: Red">*</samp></label>
                                        <div class="input-group">
                                            <div class="input-group-btn">
                                                <input id="txtnewpassword" type="password" class="form-control" placeholder="New Password" clientidmode="Static" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">
                                            Confirm Password<samp style="color: Red">*</samp></label>
                                        <div class="input-group">
                                            <div class="input-group-btn">
                                                <input id="txtconfirmpassword" type="password" class="form-control" placeholder="Confirm Password" clientidmode="Static" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div class="col-md-4">
                        </div>
                       </fieldset>
                     </div>

                </div>
            </div>
        </div>
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Modify Password" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>

</asp:Content>

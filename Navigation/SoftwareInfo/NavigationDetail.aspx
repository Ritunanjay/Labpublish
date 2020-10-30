<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="NavigationDetail.aspx.cs" Inherits="ITHospital.Navigation.SoftwareInfo.NavigationDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/navigation.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Navigation Information</h5>
                    <asp:HiddenField ID="hdfnavigationid" runat="server" ClientIDMode="Static" Value="0" />
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
                        <legend class="fieldSetLabel">Add New Navigation</legend>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Navigation Type<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">

                                        <select id="ddlnavigationType" class="form-control" clientidmode="Static" style="width: 50%">
                                            <option value="0">Main Navigation</option>
                                            <option value="1">Inner Navigation</option>
                                        </select>
                                        <select id="ddlmainmenu" class="form-control" clientidmode="Static" style="width: 50%">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Navigation Name<samp style="color: Red">*</samp></label>
                                <input id="txtnavigation" class="form-control" onfocus="uppercase(this)" placeholder="Navigation" clientidmode="Static" />
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="control-label">
                                    Navigation Path<samp style="color: Red">*</samp></label>
                                <input id="txtpath" class="form-control" placeholder="Path(Page.aspx)" onfocus="titlecase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Icon/Navigation Title<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlicon" class="form-control" clientidmode="Static" style="width: 50%">
                                        </select>
                                        <input id="txttitle" class="form-control" onfocus="titlecase(this)" placeholder="Title" clientidmode="Static" style="width: 50%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                  OrderNo/Status<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtorder" class="form-control" onfocus="allownumericwithoutdecimal(this)" placeholder="Order No" value="0" clientidmode="Static" style="width: 50%" />
                                        <select id="ddlstatus" class="form-control" clientidmode="Static" style="width: 50%">
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Navigation List</legend>
                        <div id="Div1" class="panel-wrapper collapse in" aria-expanded="true" style="overflow:scroll">
                            <div class="panel-body">
                                <table id="gv" class="table table-hover table-bordered dt-responsive" style="width: 100%;">
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

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add Navigation" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="SampleDetail.aspx.cs" Inherits="ITHospital.Navigation.Labourtary.SampleDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/sampledetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
       <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Sample Information</h5>
                    <asp:HiddenField ID="hdfsampleid" runat="server" ClientIDMode="static" Value="0" />
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
                        <legend class="fieldSetLabel">Add New Sample</legend>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Sample Name<samp style="color: Red">*</samp></label>
                                <input id="txtsample" class="form-control" placeholder="Sample Detail" clientidmode="Static"  onfocus="uppercase(this);" />

                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Sample Container<samp style="color: Red">*</samp></label>
                                <input id="txtcontainer" class="form-control" placeholder="Container" clientidmode="Static" onfocus="titlecase(this);" maxlength="16" />

                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="form-group">
                                <label class="control-label">
                                    Prefix<samp style="color: Red">*</samp></label>
                                <input id="txtprefix" class="form-control" placeholder="Prefix" clientidmode="Static" maxlength="6"  onfocus="uppercase(this);" />

                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="form-group">
                                <label class="control-label">
                                    Startwith<samp style="color: Red">*</samp></label>
                                <input id="txtstartnumber" class="form-control" placeholder="Startwith" onfocus="allownumericwithoutdecimal(this);" maxlength="3" value="0" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Format<samp style="color: Red">*</samp></label>
                                <input id="txtformat" class="form-control" placeholder="Format" value="0000" clientidmode="Static"  maxlength="6" onfocus="AllowOnlyZero(this);" />

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
                        <legend class="fieldSetLabel">Sample Information List</legend>
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

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add Sample" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" accesskey="C" />
            </div>
        </div>
    </div>
</asp:Content>

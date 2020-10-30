<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="ItemRatelist.aspx.cs" Inherits="ITHospital.Navigation.RateList.ItemRatelist" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/itemratelist.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Investigation RateList Detail </div>
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
                        <legend class="fieldSetLabel">Investigation RateList Filter</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    Patient Type<samp style="color: Red">*</samp></label>
                                <asp:HiddenField ID="hdfitemratelistid" runat="server" ClientIDMode="static" Value="0" />
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                <select id="ddlpatienttype" class="form-control" clientidmode="Static">
                                </select>
                            </div>

                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    RateList Type<samp style="color: Red">*</samp></label>
                                <select id="ddltype" class="form-control" clientidmode="Static">
                                    <option value="100">Choose
                                    </option>
                                    <option value="0">Centre
                                    </option>
                                    <option value="1">Doctor
                                    </option>
                                    <option value="2">Panel
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    From  Information<samp style="color: Red">*</samp></label>
                                <select id="ddlto" class="form-control" clientidmode="Static">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    To  Information<samp style="color: Red">*</samp></label>
                                <select id="ddlfrom" class="form-control" clientidmode="Static">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    Investigation Remain<samp style="color: Red">*</samp></label>
                                <select id="ddlremaininvestigation" class="form-control" clientidmode="Static">
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Rate Panel List</legend>

                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="panel-body" style="height: 500px; overflow: scroll">
                                    <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                                    </table>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>

        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Save Rate" />
                <input type="button" id="btntestlist" class="btn btn-success btn-xs" value="Get Test List" />
                <input type="button" id="btncopyrate" class="btn btn-info btn-xs" value="Copy Rate List" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
</asp:Content>

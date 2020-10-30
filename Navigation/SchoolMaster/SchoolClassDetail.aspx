<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="SchoolClassDetail.aspx.cs" Inherits="LabMS.Navigation.SchoolMaster.SchoolClassDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/school_js/schoolclassinfo.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">School Class Detail</h5>
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
                            <legend class="fieldSetLabel">Add New School Class </legend>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label">
                                        Class Code<samp style="color: Red">*</samp></label>
                                    <asp:HiddenField ID="hdfclassid" runat="server" ClientIDMode="static" Value="0" />
                                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                    <input id="txtcode" class="form-control" onfocus="uppercase(this)" placeholder="Code" clientidmode="Static" />

                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label class="control-label">
                                        Class Name<samp style="color: Red">*</samp></label>
                                    <input id="txtclass" class="form-control" onfocus="titlecase(this)" placeholder="ClassName" clientidmode="Static" />

                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label">
                                        Status<samp style="color: Red">*</samp></label>
                                    <select id="ddlstatus" class="form-control" clientidmode="Static">
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">School Class Detail List</legend>
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

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add Class" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>

</asp:Content>

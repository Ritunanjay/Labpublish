<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="DataUpload.aspx.cs" Inherits="LabMS.Navigation.About.DataUpload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/about.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5 class="txt-dark">About Software Information</h5>

                    <asp:HiddenField ID="hdfabout" runat="server" ClientIDMode="Static" Value="0" />
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

            <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="height: 500px">
                <div class="panel-body">
                    <div class="auth-form  ml-auto mr-auto no-float">
                        <div class="row">
                            <div class="col-sm-12 col-xs-12">
                                <select class="form-control" id="Datauploadtable">
                                  <option value="Physician">Physician</option>
                                  <option value="User">User</option>
                                  <option value="Role">Role</option>
                                </select>
                                <input type="file" id="excelfile" clientidmode="static" />
                                <input type="button" id="btnexcelupload" value="Excel Upload" clientidmode="static" />
                            </div>
                            <div class="col-sm-12 col-xs-12">

                                <asp:FileUpload ID="FileUpload1" CssClass="form-control" runat="server" />
                                <asp:Button ID="BtnImport" runat="server" Text="Upload" OnClick="BtnImport_Click" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

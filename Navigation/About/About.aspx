<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="LabMS.Navigation.About.About" %>

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
                                <div class="mb-30">
                                    <span class="block error-head text-center txt-info mb-10">   <asp:Label ID="lblcompany" runat="server" Text=""></asp:Label></span>
                                    <span class="text-center nonecase-font mb-20 block error-comment">   <asp:Label ID="lblworking" runat="server" Text=""></asp:Label></span>
                                    <span class="text-center nonecase-font mb-20 block error-comment">[Contact To Software Owner]</span>
                                    <p class="text-center">Contact Detail :    <asp:Label ID="lblmobile" runat="server" Text=""></asp:Label></p>
                                    <p class="text-center">Email Detail :    <a href="mailto:"></a><asp:Label ID="lblemail" runat="server" Text=""></asp:Label></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

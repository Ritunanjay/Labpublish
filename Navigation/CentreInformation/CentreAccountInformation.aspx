<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="CentreAccountInformation.aspx.cs" Inherits="LabMS.Navigation.CentreInformation.CentreAccountInformation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
    <script src="<%= ResolveClientUrl("~/project_js/centreaccountinformation.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="container-fluid pt-25">
            <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Centre/Franchise Account Detail</legend>
                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                               <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                               <table class="table table-responsive table-stripped table-bordered" id="gvcentredetail">
                                </table>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
     <!--Paymode--->
    <div id="ModalCentreAccountInformation" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">All Centre Booking Detail [<i class="lnkcentrename"></i>]</h5>
                </div>
                <div class="modal-body">
                     <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Centre/Franchise Account Detail</legend>
                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                               <table class="table table-responsive table-stripped table-bordered" id="gvcentrebooking">
                                </table>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <%--<div class="modal-footer">
                    <hr />
                  
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
            </div>
        </div>
    </div>

</asp:Content>

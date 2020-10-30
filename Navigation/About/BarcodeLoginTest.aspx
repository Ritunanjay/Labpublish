<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/ExamOnline.Master" AutoEventWireup="true" CodeBehind="BarcodeLoginTest.aspx.cs" Inherits="LabMS.Navigation.About.BarcodeLoginTest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="<%= ResolveClientUrl("~/school_js/barcodelogintest.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="panel panel-info card-view">
            <div class="panel-heading">
                <div class="pull-left">
                    <h6 class="panel-title txt-light">Barcode Detail</h6>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="panel-wrapper collapse in">
                <div class="panel-body">
                     <h2><strong>Here Is Your Barcode</strong></h2>
                     <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Image Detail</legend>
                         UserName : <label id="username" class="form-control"></label>
                        <div class="col-md-12">
                            <div class="panel-body" id="barcodeprint">
                                <asp:HiddenField ID="hdfvalidate" Value="0" runat="server" ClientIDMode="Static" />
                                <div class="col-md-4 col-sm-4 col-xs-4" id="img" style="display: inline;">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

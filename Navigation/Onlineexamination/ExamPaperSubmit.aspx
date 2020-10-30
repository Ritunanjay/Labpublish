<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/ExamOnline.Master" AutoEventWireup="true" CodeBehind="ExamPaperSubmit.aspx.cs" Inherits="LabMS.Navigation.Onlineexamination.ExamPaperSubmit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="<%= ResolveClientUrl("~/school_js/exampapersubmit.js") %>" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Main Content -->
    <div class="page-wrapper pa-0 ma-0 error-bg-img">
        <div class="container-fluid">
            <!-- Row -->
            <div class="table-struct full-width full-height">
                <div class="table-cell vertical-align-middle auth-form-wrap">
                    <div class="auth-form  ml-auto mr-auto no-float">
                        <div class="row">
                            <div class="col-sm-12 col-xs-12">
                                <div class="mb-30">
                                    <span class="block error-head text-center txt-info" style="font-size: 60px;">Exam Finish</span>
                                    <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                                    </table>  <span class="text-center nonecase-font mb-20 block error-comment">Your Paper was Submitted Successfully</span>
                                    <p class="text-center">Your Result Will Send In Your Mail ID</p>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Row -->
        </div>

    </div>
    <!-- /Main Content -->
</asp:Content>

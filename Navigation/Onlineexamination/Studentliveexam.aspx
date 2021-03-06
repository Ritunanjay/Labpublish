﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/ExamOnline.Master" AutoEventWireup="true" CodeBehind="Studentliveexam.aspx.cs" Inherits="LabMS.Navigation.Onlineexamination.Studentliveexam" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/school_js/studentliveexam.js") %>" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row pnlexam" style="display:none">
        <div class="col-lg-12">
            <div class="panel panel-default card-view">
                <div class="panel-heading" style="background-color: #3f729b; box-shadow: 0 0 6px 6px #090b0c; text-shadow: 0 0 7px #fbf5f5;">
                    <div class="pull-left" style="font-weight: 900;">
                        <h6 class="panel-title txt-dark">Candidate Name	:
                            <label id="lnkname">Sushil Kumar Yadav </label>
                        </h6>
                        <h6 class="panel-title txt-dark">Class/Subject	:
                            <label id="lblclass">Class/Subject </label>
                        </h6>
                        <h6 class="panel-title txt-dark">Paper Code	  :
                            <label id="lblpapercode"> PaperCode </label>
                        </h6>
                    </div>
                    <div class="pull-right">
                        <img src="101374133_1629294920555461_6294898596676370432_o.jpg" alt="" class="img img-thumbnail lnkstudentimage" style="height: 75px; width: 90px" />
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="panel-wrapper collapse in">
                    <div class="panel-body">
                        <hr class="light-grey-hr mt-10 mb-15" />
                        <p class="muted">Instruction : Please Do Not Refresh The Page.Other Wise Your Exam Is Submit Automatically. Remaining Time	:  <code id="demo" style="font-weight: bolder">00:00:00</code></p>
                        <%--  <hr class="light-grey-hr mt-10 mb-15" />
                        --%>
                        <hr class="light-grey-hr mt-10 mb-15" />
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-xs-12 col-sm-6 col-md-8">
                                    <div class="container-fluid mb-20">
                                        <h4 class="weight-500" id="question"></h4>
                                    </div>
                                    <hr class="light-grey-hr mt-10 mb-15" />
                                    <div id="o1">
                                    </div>
                                    <div id="o2">
                                    </div>
                                    <div id="o3">
                                    </div>
                                    <div id="o4">
                                    </div>
                                    <div id="o5">
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-4">
                                    <div class="button-list lnkquestionlist" style="border-width: 1px; overflow-y: scroll; height: 390px">
                                    </div>
                                    <hr class="light-grey-hr mt-10 mb-15" />

                                </div>
                                <div class="col-xs-12 col-md-12">
                                    <hr class="light-grey-hr mt-10 mb-15" />

                                    <div class="pull-left">
                                        <input class="btn btn-success btn-anim" id="btnsubmit" value="Submit Exam" type="button" />
                                        <input class="btn btn-info btn-anim" id="btnreview" value="Review" type="button" />
                                       <input class="btn btn-primary btn-anim" id="btnsave" value="Save Answer" type="button" />
                                    </div>
                                    <div class="pull-right">
                                        <input class="btn btn-primary btn-anim" id="btnprev" value="Prev" type="button" />
                                        <input class="btn btn-primary btn-anim" id="btnnext" value="Next" type="button" />
                                    </div>
                                    <table class="table table-thumbnail table-responsive">
                                        <thead>
                                            <tr>
                                                <td>
                                                    <a class="btn btn-facebook btn-icon-anim btn-circle" style="padding: 10px; font-weight: bold; background-color:blue;">1</a>
                                                </td>
                                                <td>Not Visited</td>
                                                <td>
                                                    <a class="btn btn-twitter btn-icon-anim btn-circle" style="padding: 10px; font-weight: bold; background-color:red;">2</a>
                                                </td>
                                                <td>Not Answered</td>

                                                <td>
                                                    <a class="btn btn-googleplus btn-icon-anim btn-circle" style="padding: 10px; font-weight: bold; background-color:green;" >3</a>
                                                </td>
                                                <td>Answered</td>
                                                <td>
                                                    <a class="btn btn-pinterest btn-icon-anim btn-circle" style="padding: 10px; font-weight: bold; background-color:violet;">4</a>
                                                </td>
                                                <td>Marked for Review</td>

                                                <td>
                                                    <a class="btn btn-instagram btn-icon-anim btn-circle" style="padding: 10px; font-weight: bold; background-color:lightblue;">5</a>
                                                </td>
                                                <td colspan="3">Answered &amp; Marked for Review (will be considered for evaluation)</td>
                                            </tr>
                                        </thead>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

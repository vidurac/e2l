@extends('layouts.master')

@section('content')

    <h1>Payment</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>User Id</th><th>Amount</th><th>Currency</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $payment->id }}</td> <td> {{ $payment->user_id }} </td><td> {{ $payment->amount }} </td><td> {{ $payment->currency }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
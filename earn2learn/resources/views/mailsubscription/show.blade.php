@extends('layouts.master')

@section('content')

    <h1>Mailsubscription</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>User Id</th><th>Payment</th><th>Giftcatd</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $mailsubscription->id }}</td> <td> {{ $mailsubscription->user_id }} </td><td> {{ $mailsubscription->payment }} </td><td> {{ $mailsubscription->giftcatd }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
@extends('layouts.master')

@section('content')

    <h1>Payment <a href="{{ url('payment/create') }}" class="btn btn-primary pull-right btn-sm">Add New Payment</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>User Id</th><th>Amount</th><th>Currency</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($payment as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('payment', $item->id) }}">{{ $item->user_id }}</a></td><td>{{ $item->amount }}</td><td>{{ $item->currency }}</td>
                    <td>
                        <a href="{{ url('payment/' . $item->id . '/edit') }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'url' => ['payment', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $payment->render() !!} </div>
    </div>

@endsection

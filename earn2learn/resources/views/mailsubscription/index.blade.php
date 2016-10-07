@extends('layouts.master')

@section('content')

    <h1>Mailsubscription <a href="{{ url('mailsubscription/create') }}" class="btn btn-primary pull-right btn-sm">Add New Mailsubscription</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>User Id</th><th>Payment</th><th>Giftcatd</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($mailsubscription as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('mailsubscription', $item->id) }}">{{ $item->user_id }}</a></td><td>{{ $item->payment }}</td><td>{{ $item->giftcatd }}</td>
                    <td>
                        <a href="{{ url('mailsubscription/' . $item->id . '/edit') }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'url' => ['mailsubscription', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $mailsubscription->render() !!} </div>
    </div>

@endsection
